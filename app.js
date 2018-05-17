const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const Url = mongoose.model('Url');
const shortener = require('./modules/shortener');
const validateUrl = require('./modules/validateUrl');

const myUrl = 'http://localhost:7777';

// create app
const app = express();

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// go to homepage
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
  });

// when user enter url as parameter
app.get('/short/:url*', async(req,res) => {
    // 1. check if valid url
    const url = req.url.slice(7); // url without /short
    const checkValid = validateUrl.validate(url);
    if (!checkValid) {
        res.send('url not valid, try again!');
    } else {
    // 2. create the shortener
        const short = shortener.convert(Date.now());
        const url_short = `${myUrl}/${short}`;
    // 3. check if the url exists in db
        const checkPromise = Url.findOne({ url: url });
        const newUrlPromise = new Url({ url, url_short, short });
        const [checked, newUrl] = await Promise.all([checkPromise, newUrlPromise]);
    // 4.0 if yes, send answer
        if (checked) {
            res.json({ "url": checked.url, "short": checked.url_short }); 
        } else {
        // 4.1 if no, save new url and send answer
            newUrl.save();
            res.json({ "url": newUrl.url, "short": newUrl.url_short });
        }
    }
});

// when user click on url shortener
app.get('/:url', async (req, res) => {
    // 1. get code from url & search it in url db
    const search = await Url.findOne({ short: req.params.url });
    if(!search) {
        console.log('ERROR');
        res.redirect('/');
    } else {
        res.redirect(search.url);
    }
});

module.exports = app;
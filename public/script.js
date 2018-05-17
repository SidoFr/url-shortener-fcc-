const qwant = document.querySelector('#qwant');
const google = document.querySelector('#google');
const twitter = document.querySelector('#twitter');
const buttons = document.querySelectorAll('.button');
const myUrl = 'localhost:7777';
buttons.forEach(button => button.addEventListener('click', function(evt) {
    if (evt.target === qwant) {
        console.log(qwant)
        qwant.innerHTML += `href="${myUrl}/short/https://www.qwant.com"`;
    } 
    if (evt.target === google) {
        this.innerHTML += `${myUrl}/short/https://www.google.com`;
    }
    if (evt.target === twitter) {
        this.innerHTML += `${myUrl}/short/https://www.twitter.com`;
    }
}));
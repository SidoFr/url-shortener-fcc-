/********************************************************************* 
algorithm which will generate a unique code from a passed Number
/*********************************************************************
I use it to generate a code with letters & numbers from the timestamp
I pass to the fn
**********************************************************************
search Qwant to learn more about base58 encoding
**********************************************************************/
const bibli = 'abcdefghijklmnopqrestuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = bibli.length; // base58

function convert(num) {
    let converted = '';
    while (num) {
        const remainder = num % base;
        num = Math.floor(num / base); 
        converted = bibli[remainder].toString() + converted;
    }
    return converted;
}

module.exports.convert = convert;
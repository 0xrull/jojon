const fetch = require('node-fetch');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');
const readlineSync = require('readline-sync');


const sunyouRequest = (trackingNumber) => new Promise((resolve, reject) => {
    fetch(`https://global.cainiao.com/detail.htm?mailNoList=${trackingNumber}&spm=a3708.7860688.0.d01`, {
        method:'POST',
        headers: {
            'authority': 'global.cainiao.com',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'referer': 'https://global.cainiao.com/detail.htm?mailNoList=LP194594073SG&spm=a3708.7860688.0.d01',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': 'lang=en; _ga=GA1.2.1744704474.1617777914; _gid=GA1.2.1263393310.1617777914; cna=+0L0GOZV2k0CAbT+8Mvm36Xw; xlly_s=1; tfstk=cmZVBAsljcVW2jm1Jmiw10cw5GuAanZ3XQksozYt3tT923g-TsYB6YYr-4uI9g0c.; l=eBLZHLNujH151VGQBO5ZPurza77OEQRbzfVzaNbMiIncC6chtSvNbltQDX9TrdxRJWXcGrLM4D0HduetdFTa7_hrxG1t6hlLSKDyQef..; isg=BOvrvGgdD188ylOLGWPlo0CmegnVAP-CKwR5ZV1qCCpJ_Ale49Lt0pUeVySSald6'
        }
    })
    .then(res => res.text())
    .then(res => {
        const $ = cheerio.load(res);
        const data = $('textarea#waybill_list_val_box').html();
        const newData = JSON.parse(data);
        resolve(newData)
    })
    .catch(err => reject(err))
    
});


const genUniqueId = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

;(async() => {
    const a = readlineSync.question('Masukan sample resimu : ');


    const b = a.split('');

    const startPattern = b[0]+b[1];
    const endPattern = b[b.length-2]+b[b.length-1];

    const numberPattern = b.splice(2,b.length-4);
    
    console.log(`Pattern Number kalian adalah ${numberPattern.join('')}`)

    let newPattern = ''

    console.log('')
    const manyDigit = readlineSync.question('Berapa digit depan/belakang? sample (3 depan/3 belakang) ');

    if (manyDigit.split(' ')[1] === 'belakang') {
        newPattern = numberPattern.splice(0, numberPattern.length-manyDigit.split(' ')[0])
    }else{
        newPattern = numberPattern.splice(manyDigit.split(' ')[0], numberPattern.length)
    }


    for (let index = 0; index < 50000; index++) {

        const trackingNumber = await genUniqueId(manyDigit.split(' ')[0])

        const trackNumber = manyDigit.split(' ')[1] === 'depan' ? 
        startPattern+trackingNumber+newPattern.join('')+endPattern : startPattern+newPattern.join('')+trackingNumber+endPattern;

        const sunyouRequestREsult = await sunyouRequest(trackNumber);
        if (sunyouRequestREsult.data[0].success) {
            if (sunyouRequestREsult.data[0].destCountry == 'Indonesia' && sunyouRequestREsult.data[0].statusDesc == 'Your parcel has been successfully delivered.') {
                console.log(chalk.green(`${trackNumber}|${sunyouRequestREsult.data[0].originCountry} => ${sunyouRequestREsult.data[0].destCountry}|${sunyouRequestREsult.data[0].statusDesc}`))
                await fs.appendFileSync('result.txt', `${trackNumber}\n`);
            }else{
                console.log(chalk.green(`${trackNumber}|${sunyouRequestREsult.data[0].originCountry} => ${sunyouRequestREsult.data[0].destCountry}|${sunyouRequestREsult.data[0].statusDesc}`))
                await fs.appendFileSync('result.txt', `${trackNumber}\n`);
            }
            
        }else{
            console.log(chalk.red(`${trackNumber}|Not Found`))
        }
    }
    

})();
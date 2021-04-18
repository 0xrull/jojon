const fetch = require('node-fetch');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');
const readlineSync = require('readline-sync');
const { v4: uuidv4 } = require('uuid');
const { GraphQLClient, gql } = require('graphql-request');
const generateUniqueId = require('generate-unique-id');
const constants = require('./lib/constants');
const delay = require('delay');
const moment = require('moment');
const COLORS = require("./lib/colors");

// const functionRefershToken = (refToken) => new Promise((resolve, reject) => {
//     const urlapi = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';
//     const params = new URLSearchParams;
//     params.append('grant_type', 'refresh_token');
//     params.append('refresh_token', refToken);


//     fetch(urlapi, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'x-client-version': 'ReactNative/JsCore/7.7.0/FirebaseCore-web',
//             'Host': 'securetoken.googleapis.com',
//             'content-length': 265,
//             'Accept-Encoding': 'gzip',
//             'user-agent': 'Mozilla 5.0 (Linux; U; Android 7.1.2; en_US; SM-G935DD; Build/N2G40H); com.google.android.gms/210915022; FastParser/1.1; ApiaryHttpClient/1.0; (gzip) (SM-G935DD N2G40H); gzip',
//         },
//         body: params

//     })
//         .then(res => res.json())
//         .then(result => resolve(result))
//         .catch(err => reject(err))
// });

const chunkArray = (array, size) => {
    let arr = [];
    let data = [...array];
    while (data.length > 0) {
        arr.push(data.splice(0, size));
    }
    return arr;
};

const functionRefershToken = (refToken) => new Promise((resolve, reject) => {

    const urlapi = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';


    fetch(urlapi, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Firebase-Locale': '',
        'X-Client-Version': 'Android/GmsCore/X19004000/FirebaseCore-Android',
        'Accept-Language': 'in-ID, en-US',
        'X-Android-Package': 'com.packageportal.customerapp',
        'X-Android-Cert': '0929CAD3DD194B017B0A5EE51FE5607919105672',
        'X-Goog-Spatula': 'Cj0KHWNvbS5wYWNrYWdlcG9ydGFsLmN1c3RvbWVyYXBwGhxDU25LMDkwWlN3RjdDbDdsSCtWZ2VSa1FWbkk9GNDy89S7wqXINA==',
        'User-Agent': 'Mozilla 5.0 (Linux; U; Android 5.1.1; in_ID; SM-A908N; Build/LMY47I); com.google.android.gms/211213013; FastParser/1.1; ApiaryHttpClient/1.0; (gzip) (aosp LMY47I); gzip',
        'Host': 'securetoken.googleapis.com',
        'Connection': 'close'
        },
        body: refToken

    })
        .then(res => res.json())
        .then(result => resolve(result))
        .catch(err => reject(err))
});


; (async () => {

    const listToken = await fs.readFileSync('result_token.txt', 'utf8');
    const listTokentArray = listToken.toString()
        .replace(/\r\n|\r|\n/g, " ")
        .split(" ");
        for (let l = 0; l < listTokentArray.length; l++) {
            const token = listTokentArray[l];
            try {
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Mencoba ambil token => ${token}`, COLORS.Reset);
                const tokenBody = "grant_type=refresh_token&refresh_token="+token;

                const createBearer = await functionRefershToken(tokenBody);
                const graphQLClient = new GraphQLClient(constants.endpointPP, {
                    headers: {
                        authorization: `Bearer ${createBearer.access_token}`,
                        'Host': 'prod.pp-app-api.com',
                        'Content-Type': 'application/json',
                        'content-length': 380,
                        'accept-encoding': 'gzip',
                        'user-agent': 'okhttp/3.12.1'
                    },
                });
                const valid = await graphQLClient.request(constants.qValid)
                if(valid.tracking_numbers.length === 0){
                    console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgRed, `Belom Diproses Sama Sistem Njing, Sabar dikit napa`, COLORS.Reset);
                }else{
                    console.log(valid);
                }
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Cek Selesai, Mencoba mengambil data selanjutnyaa`, COLORS.Reset);
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgMagenta, `Delay 10 detik.`, COLORS.Reset)
                await delay(10000);


    
    } catch (e) {
        console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgRed, `Ada masalah ${e}`, COLORS.Reset)
        console.log('')
    }
 }

}  )();
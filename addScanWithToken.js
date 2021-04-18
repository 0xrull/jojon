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
        const listResi = await fs.readFileSync('result.txt', 'utf8');
        const listResiArray = listResi.toString()
            .replace(/\r\n|\r|\n/g, " ")
            .split(" ");
        for (let l = 0; l < listTokentArray.length; l++) {
            const token = listTokentArray[l];
            let resi
            for (let j = 0; j < listResiArray.length; j++) {
            resi = listResiArray[l];
            }

            try {
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Mencoba ambil token => ${token}`, COLORS.Reset);
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Resi => ${resi}`, COLORS.Reset);
                const tokenBody = "grant_type=refresh_token&refresh_token="+token;
                const refreshtoken = await functionRefershToken(tokenBody)
                const graphQLClient = new GraphQLClient(constants.endpointPP, {
                    headers: {
                        authorization: `Bearer ${refreshtoken.access_token}`,
                        'Host': 'prod.pp-app-api.com',
                        'Content-Type': 'application/json',
                        'content-length': 380,
                        'accept-encoding': 'gzip',
                        'user-agent': 'okhttp/3.12.1'
                    },
                });
                const data = await graphQLClient.request(constants.qData);
                const variablesScan = {
                    objects: [
                        {
                          "user_id": data.users[0].id,
                          "tracking_number": resi,
                          "longitude": 1.357136213495232,
                          "latitude": 103.83586086852792,
                          "accuracy": 2.7103772163391113,
                          "batch_uuid": uuidv4()
                        }
                      ]
                };
                const cekScanLama = await graphQLClient.request(constants.qBatch);
                
                const scanResi = await graphQLClient.request(constants.qScan, variablesScan)
                const getBatch = await graphQLClient.request(constants.qBatch);
                if(cekScanLama.scans.length == getBatch.scans.length){
                    console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgRed, `Resi Gagal Menambahkan`, COLORS.Reset);
                }else{
                    console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Resi Berhasil Ditambahkan`, COLORS.Reset);
                }
                // console.log(scanResi.return);
                console.log('')
                console.log('=========DATA AKUN==============')
                console.log(`id : ${data.users[0].id}`)
                console.log(`Nama : ${data.users[0].first_name}`)
                console.log(`Nama : ${data.users[0].last_name}`)
                console.log(`Resi Terscan : ${getBatch.scans.length}`)
                console.log(`Wallet : ${data.users[0].wallet_address}`);
                console.log('=========DATA AKUN==============')
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgMagenta, `Delay 30Detik.`, COLORS.Reset)
                await delay(30000);
            } catch (e) {
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgRed, `Ada masalah ${e}`, COLORS.Reset)
                console.log('')
            }
    
    }
    
})();
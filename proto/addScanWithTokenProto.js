const fetch = require('node-fetch');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');
const readlineSync = require('readline-sync');
const { v4: uuidv4 } = require('uuid');
const { GraphQLClient, gql } = require('graphql-request');
const generateUniqueId = require('generate-unique-id');
const constants = require('../lib/constants');
const delay = require('delay');
const moment = require('moment');
const COLORS = require("../lib/colors");
const protobuf = require('protobufjs');

const installation = (postBody) => new Promise((resolve, reject) => {
    const urlapi = 'https://firebaseinstallations.googleapis.com/v1/projects/pp-api-prod/installations';

    fetch(urlapi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Encoding': 'gzip',
            'Cache-Control': 'no-cache',
            'X-Android-Package': 'com.packageportal.customerapp',
            'x-firebase-client': 'fire-android/ fire-analytics/17.6.0 fire-auth/19.4.0 fire-core/19.3.1 fire-rtdb/19.5.0 kotlin/1.3.50 fire-installations/16.3.2',
            'x-firebase-client-log-type': '3',
            'X-Android-Cert': '0929CAD3DD194B017B0A5EE51FE5607919105672',
            'x-goog-api-key': 'AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs',
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 7.0; Redmi Note 8 Build/NBD92Y)',
            'Host': 'firebaseinstallations.googleapis.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'Content-Length': '139'
        },
        body: JSON.stringify({
            "fid":"c13Fm2dFSQe_YBtqOUgN5i",
            "appId":"1:65122057475:android:7465e39c0b996301193d36",
            "authVersion":"FIS_v2",
            "sdkVersion":"a:16.3.2"
        })

    })
        .then(async result => {
            const newResult = await result.text();
            resolve(newResult)
        })
        .catch(err => reject(err))
});


const createAuthUri = (postBody) => new Promise((resolve, reject) => {
    const urlapi = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/createAuthUri?alt=proto&key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';

    fetch(urlapi, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-protobuf",
            "X-Firebase-Locale": "",
            "X-Client-Version": "Android/GmsCore/X19004000/FirebaseCore-Android",
            "Accept-Language": "en-US",
            "X-Android-Package": "com.packageportal.customerapp",
            "X-Android-Cert": "0929CAD3DD194B017B0A5EE51FE5607919105672",
            "X-Goog-Spatula": "Cj0KHWNvbS5wYWNrYWdlcG9ydGFsLmN1c3RvbWVyYXBwGhxDU25LMDkwWlN3RjdDbDdsSCtWZ2VSa1FWbkk9GK2HxpXvl9nJPg==",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 7.0; Redmi Note 8 Build/NBD92Y)",
            "content-length": 36,
            "Host": "www.googleapis.com",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip"
        },
        body: postBody

    })
        .then(async result => {
            const newResult = await result.text();
            resolve(newResult)
        })
        .catch(err => reject(err))
});



const verifyPassword = (postBody) => new Promise((resolve, reject) => {
    const urlapi = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?alt=proto&key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';

    fetch(urlapi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-protobuf',
            'X-Client-Version': 'Android/GmsCore/X19004000/FirebaseCore-Android',
            'Accept-Language': 'en-US',
            'X-Android-Package': 'com.packageportal.customerapp',
            'X-Android-Cert': '0929CAD3DD194B017B0A5EE51FE5607919105672',
            'X-Goog-Spatula': 'Cj0KHWNvbS5wYWNrYWdlcG9ydGFsLmN1c3RvbWVyYXBwGhxDU25LMDkwWlN3RjdDbDdsSCtWZ2VSa1FWbkk9GK2HxpXvl9nJPg==',
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 7.0; Redmi Note 8 Build/NBD92Y)',
            'content-length': '36',
            'Host': 'www.googleapis.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
        },
        body: postBody

    })
        .then(async result => {
            const newResult = await result.text();
            resolve(newResult)
        })
        .catch(err => reject(err))
});



const functionGetTokenReg = (postBody) => new Promise((resolve, reject) => {
    const urlapi = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?alt=proto&key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';

    fetch(urlapi, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-protobuf",
            "X-Firebase-Locale": "",
            "X-Client-Version": "Android/GmsCore/X19004000/FirebaseCore-Android",
            "Accept-Language": "en-US",
            "X-Android-Package": "com.packageportal.customerapp",
            "X-Android-Cert": "0929CAD3DD194B017B0A5EE51FE5607919105672",
            "X-Goog-Spatula": "Cj0KHWNvbS5wYWNrYWdlcG9ydGFsLmN1c3RvbWVyYXBwGhxDU25LMDkwWlN3RjdDbDdsSCtWZ2VSa1FWbkk9GJXKyOaf7tWbPQ==",
            "User-Agent": "Mozilla 5.0 (Linux; U; Android 7.1.2; en_US; SM-G935FD; Build/N2G48H); com.google.android.gms/210915022; FastParser/1.1; ApiaryHttpClient/1.0; (gzip) (SM-G935FD N2G48H); gzip",
            "content-length": 36,
            "Host": "www.googleapis.com",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip"
        },
        body: postBody

    })
        .then(async result => {
            const newResult = await result.text();
            resolve(newResult)
        })
        .catch(err => reject(err))
});

const functionAccInfo = (postBody) => new Promise((resolve, reject) => {
    const urlapi = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';

    fetch(urlapi, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-protobuf",
            "X-Firebase-Locale": "",
            "X-Client-Version": "Android/GmsCore/X19004000/FirebaseCore-Android",
            "Accept-Language": "en-US",
            "X-Android-Package": "com.packageportal.customerapp",
            "X-Android-Cert": "0929CAD3DD194B017B0A5EE51FE5607919105672",
            "X-Goog-Spatula": "Cj0KHWNvbS5wYWNrYWdlcG9ydGFsLmN1c3RvbWVyYXBwGhxDU25LMDkwWlN3RjdDbDdsSCtWZ2VSa1FWbkk9GJXKyOaf7tWbPQ==",
            "User-Agent": "Mozilla 5.0 (Linux; U; Android 7.1.2; en_US; SM-G935FD; Build/N2G48H); com.google.android.gms/210915022; FastParser/1.1; ApiaryHttpClient/1.0; (gzip) (SM-G935FD N2G48H); gzip",
            "content-length": 36,
            "Host": "www.googleapis.com",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip"
        },
        body: postBody

    })
    .then(async result => {
        const newResult = await result.text();
        resolve(newResult)
    })
        .catch(err => reject(err))
});

const functionRefershToken = (refToken) => new Promise((resolve, reject) => {
    const urlapi = 'https://securetoken.googleapis.com/v1/token?alt=proto&key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';
    const params = new URLSearchParams;
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refToken);


    fetch(urlapi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-client-version': 'ReactNative/JsCore/7.7.0/FirebaseCore-web',
            'Host': 'securetoken.googleapis.com',
            'content-length': 265,
            'Accept-Encoding': 'gzip',
            'user-agent': 'okhttp/3.12.1',
        },
        body: params

    })
        .then(res => res.json())
        .then(result => resolve(result))
        .catch(err => reject(err))
});

; (async () => {

    // const installationResult = await installation();
    // console.log(installationResult)

    const rootCreateAuthUri = await protobuf.load('createAuthUri.proto');  
    const CreateAuthUri = rootCreateAuthUri.lookupType('userPackage.Request');
    const postBodyCreateAuthUri = CreateAuthUri.encode({ email: "youremail", link: "http://localhost"}).finish();
    const authUriResponse = await createAuthUri(postBodyCreateAuthUri);
    console.log(authUriResponse)

    const rootVerifyPassword = await protobuf.load('verifyPassword.proto');  
    const VerifyPassword = rootVerifyPassword.lookupType('userPackage.Request');
    const postBodyVerifyPassword = VerifyPassword.encode({ email: "youremail", password: "yourpassword", returnSecureToken: true}).finish();
    const verifyPasswordResponse = await verifyPassword(postBodyVerifyPassword);
    console.log(verifyPasswordResponse)
    const idToken = verifyPasswordResponse.split("*")[1].replace('�', '');
    const accessToken = idToken.toString().slice(0, -2).slice(1, idToken.length)
    console.log('\n')
    const rootgetAccntInfo = await protobuf.load('getAccntInfo.proto');  
    const GetAccntInfo= rootgetAccntInfo.lookupType('userPackage.Request');
    const postBodyGetAccntInfo = GetAccntInfo.encode({ idToken: accessToken  }).finish();
    const getAccntInfoResponse = await functionAccInfo(postBodyGetAccntInfo);
    console.log(getAccntInfoResponse)

    console.log(accessToken)

    const graphQLClient = new GraphQLClient(constants.endpointPP, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Host': 'prod.pp-app-api.com',
            'Content-Type': 'application/json',
            // 'Content-Length': 380,
            // 'accept-encoding': 'gzip',
            'X-Hasura-Role': 'user',
            'user-agent': 'Mozilla 5.0 (Linux; U; Android 7.1.2; en_US; SM-G935FD; Build/N2G48H); com.google.android.gms/210915022; FastParser/1.1; ApiaryHttpClient/1.0; (gzip) (SM-G935FD N2G48H); gzip'
        },
    });
    const data = await graphQLClient.request(constants.qData);
    const variablesScan = {
        objects: [
            {
              "user_id": data.users[0].id,
              "tracking_number": "9716515001",
              "longitude": 1.357136213495232,
              "latitude": 103.83586086852792,
              "accuracy": 2.7103772163391113,
              "batch_uuid": uuidv4()
            }
          ]
    };
    const cekScanLama = await graphQLClient.request(constants.qBatch);
    console.log(cekScanLama)
    
    // const scanResi = await graphQLClient.request(constants.qScan, variablesScan);
    // console.log(scanResi)
    // const getBatch = await graphQLClient.request(constants.qBatch);
    // if(cekScanLama.scans.length == getBatch.scans.length){
    //     console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgRed, `Resi Gagal Menambahkan`, COLORS.Reset);
    // }else{
    //     console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Resi Berhasil Ditambahkan`, COLORS.Reset);
    // }
    // // console.log(scanResi.return);
    // console.log('')
    // console.log('=========DATA AKUN==============')
    // console.log(`id : ${data.users[0].id}`)
    // console.log(`Nama : ${data.users[0].first_name}`)
    // console.log(`Nama : ${data.users[0].last_name}`)
    // console.log(`Resi Terscan : ${getBatch.scans.length}`)
    // console.log(`Wallet : ${data.users[0].wallet_address}`);
    // console.log('=========DATA AKUN==============')
    // console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgMagenta, `Delay 30Detik.`, COLORS.Reset)

    // const listToken = await fs.readFileSync('addResi_token.txt', 'utf8');
    // const listTokentArray = listToken.toString()
    //     .replace(/\r\n|\r|\n/g, " ")
    //     .split(" ");
    //     const listResi = await fs.readFileSync('AddResi.txt', 'utf8');
    //     const listResiArray = listResi.toString()
    //         .replace(/\r\n|\r|\n/g, " ")
    //         .split(" ");
    //     for (let l = 0; l < listTokentArray.length; l++) {
    //         const token = listTokentArray[l];
    //         let resi
    //         for (let j = 0; j < listResiArray.length; j++) {
    //         resi = listResiArray[l];
    //         }

    //         try {
    //             console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Mencoba ambil token => ${token}`, COLORS.Reset);
    //             console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Resi => ${resi}`, COLORS.Reset);
    //             const refreshtoken = await functionRefershToken(token)
    //             const graphQLClient = new GraphQLClient(constants.endpointPP, {
    //                 headers: {
    //                     authorization: `Bearer ${refreshtoken.access_token}`,
    //                     'Host': 'prod.pp-app-api.com',
    //                     'Content-Type': 'application/json',
    //                     'content-length': 380,
    //                     'accept-encoding': 'gzip',
    //                     'user-agent': 'okhttp/3.12.1'
    //                 },
    //             });
    //             const data = await graphQLClient.request(constants.qData);
    //             const variablesScan = {
    //                 objects: [
    //                     {
    //                       "user_id": data.users[0].id,
    //                       "tracking_number": resi,
    //                       "longitude": 1.357136213495232,
    //                       "latitude": 103.83586086852792,
    //                       "accuracy": 2.7103772163391113,
    //                       "batch_uuid": uuidv4()
    //                     }
    //                   ]
    //             };
    //             const cekScanLama = await graphQLClient.request(constants.qBatch);
                
    //             const scanResi = await graphQLClient.request(constants.qScan, variablesScan)
    //             const getBatch = await graphQLClient.request(constants.qBatch);
    //             if(cekScanLama.scans.length == getBatch.scans.length){
    //                 console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgRed, `Resi Gagal Menambahkan`, COLORS.Reset);
    //             }else{
    //                 console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Resi Berhasil Ditambahkan`, COLORS.Reset);
    //             }
    //             // console.log(scanResi.return);
    //             console.log('')
    //             console.log('=========DATA AKUN==============')
    //             console.log(`id : ${data.users[0].id}`)
    //             console.log(`Nama : ${data.users[0].first_name}`)
    //             console.log(`Nama : ${data.users[0].last_name}`)
    //             console.log(`Resi Terscan : ${getBatch.scans.length}`)
    //             console.log(`Wallet : ${data.users[0].wallet_address}`);
    //             console.log('=========DATA AKUN==============')
    //             console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgMagenta, `Delay 30Detik.`, COLORS.Reset)
    //             await delay(30000);
    //         } catch (e) {
    //             console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgRed, `Ada masalah ${e}`, COLORS.Reset)
    //             console.log('')
    //         }
    
    // }
    
})();
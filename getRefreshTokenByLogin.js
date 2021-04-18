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
    const urlapi = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';

    fetch(urlapi, {
        method: 'POST',
        headers: {
            'X-Client-Version': 'Android/GmsCore/X19004000/FirebaseCore-Android',
            'X-Android-Package': 'com.packageportal.customerapp',
            'X-Android-Cert': '0929CAD3DD194B017B0A5EE51FE5607919105672'
        },
        body: JSON.stringify(postBody)

    })
        .then(async result => {
            const newResult = await result.json();
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
            'X-Client-Version': 'Android/GmsCore/X19004000/FirebaseCore-Android',
            'X-Android-Package': 'com.packageportal.customerapp',
            'X-Android-Cert': '0929CAD3DD194B017B0A5EE51FE5607919105672'
        },
        body: JSON.stringify(postBody)

    })
    .then(async result => {
        const newResult = await result.json();
        resolve(newResult)
    })
        .catch(err => reject(err))
});

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

const functionGetUID = (data) => new Promise((resolve, reject) => {

    const urlapi = 'https://prod.pp-app-api.com/v1/graphql';
    const accessToken = data.accessToken;

    const bodyy = '{"operationName":"insert_multiple_users","variables":{"objects":{"email":"'+data.email+'","first_name":"'+data.fn+'","last_name":"'+data.ln+'","last_logged_in":"2021-04-17T18:44:09.100Z"}},"query":"mutation insert_multiple_users($objects: [users_insert_input!]!) {\n  insert_users(objects: $objects) {\n    returning {\n      id\n      __typename\n    }\n    __typename\n  }\n}\n"}';
        fetch(urlapi, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Host': 'prod.pp-app-api.com',
            'Content-Type': 'application/json',
            // 'Content-Length': 380,
            // 'accept-encoding': 'gzip',
            'X-Hasura-Role': 'user',
            'user-agent': 'Mozilla 5.0 (Linux; U; Android 7.1.2; en_US; SM-G935FD; Build/N2G48H); com.google.android.gms/210915022; FastParser/1.1; ApiaryHttpClient/1.0; (gzip) (SM-G935FD N2G48H); gzip'
        },
        body: bodyy

    })
        .then(res => res.json())
        .then(result => resolve(result))
        .catch(err => reject(err))
});


; (async () => {

    const listAkun = await fs.readFileSync('akunPP.txt', 'utf8');
    const listAkunArray = listAkun.toString()
        .replace(/\r\n|\r|\n/g, " ")
        .split(" ");

    for (let index = 0; index < listAkunArray.length; index++) {
        const akun = listAkunArray[index];
        const email = akun.split('|')[0]
        const password = akun.split('|')[1]

        console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgMagenta, `Mencoba dengan akun ${email}`, COLORS.Reset)

        const rootCreateAuthUri = await protobuf.load('./proto/createAuthUri.proto');  
        const CreateAuthUri = rootCreateAuthUri.lookupType('userPackage.Request');
        const postBodyCreateAuthUri = CreateAuthUri.encode({ email, link: "http://localhost"}).finish();
        const authUriResponse = await createAuthUri(postBodyCreateAuthUri);

        const verifyPasswordResponse = await verifyPassword({ email, password, returnSecureToken: true});
        const idToken = verifyPasswordResponse.idToken;
        const accessToken = idToken
        const refreshtoken = verifyPasswordResponse.refreshToken

        const getAccntInfoResponse = await functionAccInfo({ idToken: accessToken  });

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
        const cekScanLama = await graphQLClient.request(constants.qBatch);
        const getBatch = await graphQLClient.request(constants.qBatch);

        fs.appendFileSync('refresh_token.txt', `${refreshtoken}\n`);

        // console.log(scanResi.return);
        console.log('')
        console.log('=========DATA AKUN==============')
        console.log(`id : ${data.users[0].id}`)
        console.log(`Nama : ${data.users[0].first_name}`)
        console.log(`Nama : ${data.users[0].last_name}`)
        console.log(`Resi Terscan : ${getBatch.scans.length}`)
        console.log(`Wallet : ${data.users[0].wallet_address}`);
        console.log('=========DATA AKUN==============')
        console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgMagenta, `Done`, COLORS.Reset)
        
    }


    
    
})();
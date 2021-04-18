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

function getString(start, end, all) {
    const regex = new RegExp(`${start}(.*?)${end}`);
    const str = all
    const result = regex.exec(str);
    return result;
}

const generateIndoName = () => new Promise((resolve, reject) => {
    fetch('https://wirkel.com/data.php?qty=1', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
});

function randstr(length) {
    result = '';
    const characters = '012345678910abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}




const sunyouRequest = (trackingNumber) => new Promise((resolve, reject) => {
    fetch(`https://global.cainiao.com/detail.htm?mailNoList=${trackingNumber}&spm=a3708.7860688.0.d01`, {
        method: 'POST',
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

const functionGetTokenReg = (email, pass) => new Promise((resolve, reject) => {
    const urlapi = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';
    const bodys = {
        "email":email,"password":pass,"returnSecureToken":true
    }

    fetch(urlapi, {
        method: 'POST',
        headers: {
            'X-Client-Version': 'Android/GmsCore/X19004000/FirebaseCore-Android',
            'X-Android-Package': 'com.packageportal.customerapp',
            'X-Android-Cert': '0929CAD3DD194B017B0A5EE51FE5607919105672'
        },
        body: JSON.stringify(bodys)

    })
        .then(res => res.json())
        .then(result => resolve(result))
        .catch(err => reject(err))
});

const functionAccInfo = (token) => new Promise((resolve, reject) => {
    const urlapi = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';
    const params = new URLSearchParams;
    params.append('idToken', token);

    fetch(urlapi, {
        method: 'POST',
        headers: {
            'X-Client-Version': 'Android/GmsCore/X19004000/FirebaseCore-Android',
            'X-Android-Package': 'com.packageportal.customerapp',
            'X-Android-Cert': '0929CAD3DD194B017B0A5EE51FE5607919105672'
        },
        body: params

    })
        .then(res => res.json())
        .then(result => resolve(result))
        .catch(err => reject(err))
});

const functionRefershToken = (refToken) => new Promise((resolve, reject) => {
    const urlapi = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';
    const params = new URLSearchParams;
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refToken);


    fetch(urlapi, {
        method: 'POST',
        headers: {
            'X-Client-Version': 'Android/GmsCore/X19004000/FirebaseCore-Android',
            'X-Android-Package': 'com.packageportal.customerapp',
            'X-Android-Cert': '0929CAD3DD194B017B0A5EE51FE5607919105672'
        },
        body: params

    })
        .then(res => res.json())
        .then(result => resolve(result))
        .catch(err => reject(err))
});

const functionVerifEmail = (token) => new Promise((resolve, reject) => {
    const urlapi = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=AIzaSyCX35qaNrESINLfA4qwfqPQb6cNHnEzAMs';
    const params = new URLSearchParams;
    params.append('requestType', "VERIFY_EMAIL");
    params.append('idToken', token);

    fetch(urlapi, {
        method: 'POST',
        headers: {
            'X-Client-Version': 'Android/GmsCore/X19004000/FirebaseCore-Android',
            'X-Android-Package': 'com.packageportal.customerapp',
            'X-Android-Cert': '0929CAD3DD194B017B0A5EE51FE5607919105672'
        },
        body: params

    })
        .then(res => res.json())
        .then(result => resolve(result))
        .catch(err => reject(err))
});


const functionGetLink = (email, domain) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/${domain}/${email}`, {
        method: "get",
        headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "accept-encoding": "gzip, deflate, br",
            cookie: `_ga=GA1.2.659238676.1567004853; _gid=GA1.2.273162863.1569757277; embx=%5B%22${email}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=io=tIcarRGNgwqgtn40O${randstr(3)}; surl=${domain}%2F${email}`,
            "upgrade-insecure-requests": 1,
            "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
        }
    })
        .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text)
            const data = $("#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > p:nth-child(3) > a").attr('href')
            resolve(data);
        })
        .catch(err => reject(err));
});


const veryfEmail = (url) => new Promise((resolve, reject) => {
    const oobCode = getString('oobCode=', "&", url)[1];
    const apiKey = getString('apiKey=', "&", url)[1];
    fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=' + apiKey, {
        method: 'POST',
        headers: {
            'authority': 'www.googleapis.com',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'x-client-version': 'Chrome/JsCore/3.7.5/FirebaseCore-web',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
            'content-type': 'application/json',
            'accept': '*/*',
            'origin': 'https://auth.packageportal.com',
            'x-client-data': 'CLO1yQEIh7bJAQiitskBCMG2yQEIqZ3KAQj4x8oBCLGaywEI45zLAQioncsB',
            'sec-fetch-site': 'cross-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://auth.packageportal.com/',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        body: JSON.stringify({ "oobCode": oobCode })
    })
        .then(async res => {
            const resultHtml = await res.json()
            resolve(resultHtml)
        })
        .catch(err => {
            reject(err)
        })
});

const chunkArray = (array, size) => {
    let arr = [];
    let data = [...array];
    while (data.length > 0) {
        arr.push(data.splice(0, size));
    }
    return arr;
};



; (async () => {
    // const a = readlineSync.question('Masukan sample resimu : ');

    const listResi = await fs.readFileSync('result.txt', 'utf8');
    const listResiArray = chunkArray(listResi.toString()
        .replace(/\r\n|\r|\n/g, " ")
        .split(" "), 2);

    const listWallet = await fs.readFileSync('list.txt', 'utf8');
    const listWalletArray = listWallet.toString()
        .replace(/\r\n|\r|\n/g, " ")
        .split(" ");


    for (let l = 0; l < listWalletArray.length; l++) {
        const wallet = listWalletArray[l];
        let multipleResi
        for (let j = 0; j < listResiArray.length; j++) {
            multipleResi = listResiArray[l];

        }
        try {
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Mencoba create untuk Wallet => ${wallet}`, COLORS.Reset);
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Resi => ${multipleResi.join(',')}`, COLORS.Reset);

            const domainName = 'rackabzar.com';
            const domainResult = domainName.includes(',') ? domainName.split(',') : [domainName];
            const domain = domainResult[Math.floor(Math.random() * domainResult.length)];

            const indoName = await generateIndoName();
            const { result } = indoName;
            const name = result[0].firstname.toLowerCase() + result[0].lastname.toLowerCase()

            const email = `${name}@${domain}`;
            const pass = "Jancok980";
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Dengan Akun => ${email}|${pass}`, COLORS.Reset);
            const wallet_address = wallet;

            const tokenREG = await functionGetTokenReg(email, pass)
            // console.log(tokenREG)
            const refreshtoken = await functionRefershToken(tokenREG.refreshToken)
            // console.log(refreshtoken)
            const GetAccInfo = await functionAccInfo(refreshtoken.access_token)
            // console.log(GetAccInfo)

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

            const variablesRegis = {
                objects: {
                    "email": email,
                    "first_name": result[0].firstname.toLowerCase(),
                    "last_name": result[0].lastname.toLowerCase(),
                    "last_logged_in": new Date().toISOString()
                }
            };

            const registAcc = await graphQLClient.request(constants.qRegist, variablesRegis)
            // console.log(registAcc)

            const genrete_Installid = generateUniqueId({
                length: 16,
                excludeSymbols: ['0']
            });

            const variablesNewInstal = {
                object: {
                    "user_id": registAcc.insert_users.returning[0].id,
                    "install_id": genrete_Installid
                }
            }

            await graphQLClient.request(constants.qInsertNewInstal, variablesNewInstal);

            await delay(5000);
            const verifEmail = await functionVerifEmail(tokenREG.idToken)

            await delay(5000);
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Mencoba mendapatkan link konfirmasi`, COLORS.Reset)
            let linkConfirm;
            do {
                linkConfirm = await functionGetLink(name, domain);
                console.log(linkConfirm)
            } while (!linkConfirm);

            console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Berhasil mendapatkan link ${linkConfirm}`, COLORS.Reset)
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Proses Verifikasi....`, COLORS.Reset)

            const resultVeryfEmail = await veryfEmail(linkConfirm);
            if (!resultVeryfEmail.emailVerified) {
                console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgRed, `Gagal verif email....`, COLORS.Reset)
            }

            console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Sukses Verif email....`, COLORS.Reset)


            await delay(15000);


            const refreshtoken2 = await functionRefershToken(tokenREG.refreshToken)

            const newgraphQLClient = new GraphQLClient(constants.endpointPP, {
                headers: {
                    authorization: `Bearer ${refreshtoken2.access_token}`,
                    'Host': 'prod.pp-app-api.com',
                    'Content-Type': 'application/json'
                },
            });

            const data = await newgraphQLClient.request(constants.qData);

            const variablesWallet = {
                "wallet_address": wallet_address
            };

            const variablesScan = {
                objects: await Promise.all(multipleResi.map(resi => {
                    return {
                        "user_id": data.users[0].id,
                        "tracking_number": resi,
                        "longitude": 12.433413803063528,
                        "latitude": 28.716225476454227,
                        "accuracy": 2.7103772163391113,
                        "batch_uuid": uuidv4()
                    }
                }))
            };

            const dataValid = await newgraphQLClient.request(constants.qValid)
            const updateWallet = await newgraphQLClient.request(constants.qWallet, variablesWallet)
            const scanResi = await newgraphQLClient.request(constants.qScan, variablesScan)


            //  GET BATCH UID
            const getBatch = await graphQLClient.request(constants.qBatch);

            console.log('')
            console.log('=========DATA AKUN==============')
            console.log(`id: ${data.users[0].id}`)
            console.log(`Nama: ${data.users[0].first_name}`)
            console.log(`Nama: ${data.users[0].last_name}`)
            console.log(`Resi Terscan: ${getBatch.scans.length}`)
            console.log(`Wallet Update to: ${updateWallet.update_users.returning[0].wallet_address}`);
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Sukses Verif email....`, COLORS.Reset)


            await fs.appendFileSync('result_token.txt', `${tokenREG.refreshToken}\n`);
            console.log('=========DATA AKUN==============')

            console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgGreen, `Delay 1 menit.`, COLORS.Reset)
            console.log('')
            await delay(60000);
        } catch (e) {
            console.log(e)
            console.log(`[ ${moment().format("HH:mm:ss")} ]`, COLORS.FgRed, `Ada masalah ${e}`, COLORS.Reset)
            console.log('')
        }

    }

})();
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require("fs");


const getBalanceByWallet = (wallet) => new Promise((resolve, reject) => {
    fetch(`https://viewblock.io/zilliqa/address/${wallet}?txsType=tokens&tab=tokens`, {
        method:'GET'
    })
    .then(res => res.text())
    .then(res => {
        const $ = cheerio.load(res);
        const data = $('div.sc-1gnu6p8-0.dXDDNa').text()
        resolve(data)
    })
    .catch(err => reject(err))
});


;(async() => {
    fs.readFile('list.txt', async function(err, data) {
        if (err) throw err;
        const array = data
          .toString()
          .replace(/\r\n|\r|\n/g, " ")
          .split(" ");
        
        let index = 0;
        let saldo = 0;
        function myLoop() {
            setTimeout(async() => {
                const element = array[index];
                const sunyouRequestREsult = await getBalanceByWallet(element);
                const res = sunyouRequestREsult.split("Proof Of Receipt Token");
                res.length == 2 ? console.log(element+" => Landing bos | Balance:"+res[1]) : console.log(element+" => Sad belum landing");
                if (res.length == 2){
                    const balanceNow = res[1].split("  ")
                    saldo += parseInt(balanceNow[0])
                }
                console.log("Total Balance Saat ini: ", saldo+"PORT");
                index += 1;
                if (index < array.length) {
                    myLoop();
                }
            }, 2000)
        }
        myLoop(); 
      });
      
})();
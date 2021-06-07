const fetch = require('node-fetch');
const fs = require('fs')
require('dotenv').config()
const { URLSearchParams } = require('url');
const tdl_file = './available-tdls.json'
const args = process.argv.slice(2);
const GANDI_KEY = process.env.GANDI_KEY;
const headers= {
    'authorization':`Apikey ${GANDI_KEY}`
    }

const tdls = JSON.parse(fs.readFileSync(tdl_file, 'utf8'));

console.log(tdls)
for(var i in tdls) {

    const domain = args+"."+tdls[i].name
    console.log(domain)
const params = new URLSearchParams();
params.append('name',domain);

var url = new URL('https://api.gandi.net/v5/domain/check')

url.search = new URLSearchParams(params).toString();
     
fetch(url, { method: 'GET',headers})
    .then(res => res.json())
    .then((json)=>{
       console.log(json)
    });

 }

const fetch = require("node-fetch");
const fs = require("fs");
require("dotenv").config();

const GANDI_KEY = process.env.GANDI_KEY;
const tdl_file = "./available-tdls.json";
const headers = {
  "Content-Type": "application/json",
  authorization: `Apikey ${GANDI_KEY}`,
};

fetch(" https://api.gandi.net/v5/domain/tlds", {
  method: "get",
  headers,
})
  .then((res) => res.json())
  .then((json) => {
    fs.writeFile(tdl_file, JSON.stringify(json), function (err, data) {
      if (err) {
        return console.log(err);
      } else {
        console.log(`${tdl_file} updated.`);
      }
    });
  });

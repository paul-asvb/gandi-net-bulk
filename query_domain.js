import fetch from "node-fetch";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { RateLimit } from "async-sema";
import { URLSearchParams } from "url";

dotenv.config();
const tdl_file = "./available-tdls.json";
const GANDI_KEY = process.env.GANDI_KEY;
const headers = {
  authorization: `Apikey ${GANDI_KEY}`,
};

const tdls = JSON.parse(fs.readFileSync(tdl_file, "utf8"));
const args = process.argv.slice(2);

if (typeof args == "undefined") {
  console.error("no argument defined. try to run:");
  console.error("npm run query test");
  process.exit(1);
}

const limit = RateLimit(1);

const allResults = [];

const fetchFromApi = (tdl) => {
  const domain = args + "." + tdl.name;
  const params = new URLSearchParams();
  params.append("name", domain);
  var url = new URL("https://api.gandi.net/v5/domain/check");
  url.search = new URLSearchParams(params).toString();
  return fetch(url, { method: "GET", headers })
    .then((x) => x.json())
    .catch((error) => console.log(error));
};

for (const i of tdls) {
  await limit();
  fetchFromApi(i).then((result) => allResults.push(result));
  console.log((100 * allResults.length) / tdls.length);
}

fs.writeFile("./prices.json", JSON.stringify(allResults), function (err, data) {
    if (err) {
      return console.log(err);
    } else {
      console.log(`${tdl_file} updated.`);
    }
  });

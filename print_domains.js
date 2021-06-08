import * as fs from "fs";

const prices = JSON.parse(fs.readFileSync("./prices.json", "utf8"));

const filteredDomains = prices.filter(
  (e) =>
    typeof e.products !== "undefined" &&
    typeof e.products[0].prices !== "undefined"
);
const mapped = filteredDomains.map((i) => ({
  name: i.products[0].name,
  price: i.products[0].prices[0].price_after_taxes,
}));

const sorted = mapped.sort(function (a, b) {
  return a.price - b.price;
});

for (const i of sorted) {
  console.log(i.name, i.price);
}

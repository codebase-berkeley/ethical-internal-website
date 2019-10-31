const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const fetch = require("node-fetch");

const userId = None;
const basicAuth = None;

app.use(cors());

app.get("/inventory", function(req, res) {
  res.send(getId());
});

async function getId() {
  let inventoryList = [];
  let idList = [];

  const response = await fetch(
    "https://api.bigcartel.com/v1/accounts/" + userId + "/products",
    {
      headers: {
        Authorization: "Basic " + basicAuth,
        "Content-type": "application/vnd.api+json",
        Accept: "application/vnd.api+json"
      }
    }
  );
  const json = await response.json();
  console.log(json);
  for (let i = 0; i < json.data.length; i++) {
    idList.push(json.data[i].relationships.options.data[0].id);
  }
  var includedList = json.included.filter(e => e.type == "product_options");
  for (let i = 0; i < idList.length; i++) {
    var obj = includedList.filter(e => e.id == idList[i]);
    var x = [
      json.data[i].attributes.name,
      obj[0].attributes.quantity,
      obj[0].attributes.price,
      obj[0].attributes.sold
    ];
    inventoryList.push(x);
  }
  return inventoryList;
}

app.listen(port, () => console.log("listening! server started"));

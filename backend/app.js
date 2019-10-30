const express = require("express");
const axios = require("axios");
const app = express();
const port = 2999;
const cors = require("cors");

const userId = None;
const basicAuth = None;

app.use(cors());

app.get("/inventory", function(req, res) {
  getId(result => {
    console.log(result);
    res.send(result);
  });
});

async function getId(callback) {
  let inventoryList = [];
  let idList = [];
  let config = {
    headers: {
      Authorization: "Basic " + basicAuth,
      "Content-type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    }
  };
  axios
    .get(
      "https://api.bigcartel.com/v1/accounts/" + userId + "/products",
      config
    )
    .then(function(response) {
      for (let i = 0; i < response.data.data.length; i++) {
        idList.push(response.data.data[i].relationships.options.data[0].id);
      }
      console.log(idList);
      var includedList = response.data.included.filter(
        e => e.type == "product_options"
      );
      for (let i = 0; i < idList.length; i++) {
        var obj = includedList.filter(e => e.id == idList[i]);
        var x = [
          response.data.data[i].attributes.name,
          obj[0].attributes.quantity,
          obj[0].attributes.price,
          obj[0].attributes.sold
        ];
        inventoryList.push(x);
      }
      callback(inventoryList);
    })
    .catch(function(error) {
      console.log("an error! oh no!");
      console.log(error);
    });
}

app.listen(port, () => console.log("listening! server started"));

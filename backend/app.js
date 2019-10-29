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
        idList.push(response.data.data[i].id);
      }
      let counter = 0;
      getInventory(idList, result => {
        counter += 1;
        if (counter == idList.length) {
          callback(JSON.stringify(result));
        }
      });
    });
}

function getInventory(list, callback) {
  let inventoryList = [];
  let idList = list;
  let config = {
    headers: {
      Authorization: "Basic " + basicAuth,
      "Content-type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    }
  };
  for (let i = 0; i < idList.length; i++) {
    axios
      .get(
        "https://api.bigcartel.com/v1/accounts/" +
          userId +
          "/products/" +
          idList[i],
        config
      )
      .then(function(response) {
        var x = [
          response.data.data.attributes.name,
          response.data.included[0].attributes.quantity,
          response.data.included[0].attributes.price,
          response.data.included[0].attributes.sold
        ];
        inventoryList.push(x);
        callback(inventoryList);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

app.listen(port, () => console.log("listening! server started"));

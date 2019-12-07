require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3001;
const db = require("./AnnouncementsQueries");
const cors = require("cors");
const fetch = require("node-fetch");
const loginPassword = process.env.loginPassword;
const accessToken = process.env.accessToken;
const userId = process.env.userId;
const basicAuth = process.env.basicAuth;
const googleSheet = process.env.googleSheet;
const readline = require("readline");
const { google } = require("googleapis");
var fs = require("fs");
const ordersdb = require("./orderquery");
const bcryptjs = require("bcryptjs");
app.use(cors());
app.use(bodyParser.json());
const withAuth = require("./middleware");
const checkAccess = require("./withAccess");

//expess endpoint that checks if localStorage has the access token already.
app.get("/checkToken", checkAccess);

/*
 * express endpoint to verify password. password attempt is hashed and
 * then compared with the hashed version of the actual password.
 */

app.post("/login", async function(req, res) {
  const { hashedAttempt } = req.body;
  res.send(await getAccessToken(hashedAttempt));
});

async function getAccessToken(hashedAttempt) {
  if (await bcryptjs.compare(loginPassword, hashedAttempt)) {
    return JSON.stringify({ token: accessToken, correctPassword: true });
  } else {
    return JSON.stringify({ token: "", correctPassword: false });
  }
}

//express endpoint to bigcartel api
app.get("/inventory", withAuth, async function(req, res) {
  res.send(await getId());
});

//returns list of row objects corresponding to Inventory.js
async function getId() {
  let idList = [];

  const response = await fetch(
    "https://api.bigcartel.com/v1/accounts/" +
      userId +
      "/products?page%5Blimit%5D=100",
    {
      headers: {
        Authorization: "Basic " + basicAuth,
        "Content-type": "application/vnd.api+json",
        Accept: "application/vnd.api+json"
      }
    }
  );
  const json = await response.json();
  return await getInventory(idList, json);
}

async function getInventory(idList, json) {
  let list = [];

  //this singleProdInfos creates and array for all the data of single type products
  var singleProdInfos = json.data.filter(
    item => item.relationships.options.data.length == 1
  );

  var singleProductIDAndName = [];
  //this singleProductIDAndName creates an array that contains all the Products' IDs and Names
  for (let i = 0; i < singleProdInfos.length; i++) {
    singleProductIDAndName.push([
      singleProdInfos[i].relationships.options.data[0].id,
      singleProdInfos[i].attributes.name
    ]);
  }

  /*
  this includedList creates an array all of the product IDs in included.json and we use
  that to match with the IDs in singleProductIDAndName array and from there create a new
  nested arrays that contains the product name, quantity, price, and how many are sold.
  */
  var includedList = json.included.filter(e => e.type == "product_options");
  for (let i = 0; i < singleProductIDAndName.length; i++) {
    var singleObj = includedList.filter(
      e => e.id == singleProductIDAndName[i][0]
    );
    var singleProductDisplayInfo = [
      singleProductIDAndName[i][1],
      singleObj[0].attributes.quantity,
      singleObj[0].attributes.price,
      singleObj[0].attributes.sold
    ];
    list.push(singleProductDisplayInfo); //we push that singleProductDisplayInfo array into the list array
  }

  //this multiProdInfos creates and array for all the data of single type products
  var multiProductInfo = json.data.filter(
    item => item.relationships.options.data.length != 1
  );

  var multiProductIdName = [];
  //this multiProductIDAndName creates an array that contains all the Products' IDs and Names
  for (let i = 0; i < multiProductInfo.length; i++) {
    let multiProductInfoDataLength =
      multiProductInfo[i].relationships.options.data.length;
    for (let n = 0; n < multiProductInfoDataLength; n++) {
      multiProductIdName.push([
        multiProductInfo[i].relationships.options.data[n].id,
        multiProductInfo[i].attributes.name
      ]);
    }
  }

  /*
  we use the the includedList array to match with the IDs in multiProductIDAndName array
  and from there create a new nested arrays that contains the product name, quantity, price,
  and how many are sold.
  */
  for (let i = 0; i < multiProductIdName.length; i++) {
    var multiObj = includedList.filter(e => e.id == multiProductIdName[i][0]);
    var multiProductDisplayInfo = [
      multiProductIdName[i][1] + " (" + multiObj[0].attributes.name + ")",
      //json.data[i].attributes.name,
      multiObj[0].attributes.quantity,
      multiObj[0].attributes.price,
      multiObj[0].attributes.sold
    ];
    list.push(multiProductDisplayInfo); //we push that multiProductDisplayInfo array into the list array
  }

  return list;
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", withAuth, function(req, res) {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

//frontend makes requests to express endpoint AnnouncementQueries.js
app.get("/announcements", withAuth, db.getAllAnnouncements);
app.get("/announcements/:id", withAuth, db.getAnnouncement);
app.post("/announcements", withAuth, db.createAnnouncement);
app.put("/announcements/:id", withAuth, db.editAnnouncement);
app.delete("/announcements/:id", withAuth, db.deleteAnnouncement);

//express endpoint makes requests to orderquery.js
app.put("/orders/:orderId", withAuth, ordersdb.updatePickUp);
app.get("/orders", withAuth, function(req, res) {
  // Authorization
  fs.readFile("credentials.json", (err, content) => {
    if (err) console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), getSheetsData);
  });

  /*
  Prints the order information from EthiCal's Google Sheet:
  */
  function getSheetsData(auth) {
    const sheets = google.sheets({ version: "v4", auth });
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: googleSheet,
        range: "A2:H"
      },
      async (err, response) => {
        if (err) console.log("The API returned an error: " + err);
        // Assigns rows to order data from Google Sheets
        const rows = response.data.values;
        // Iterates through rows to apply database operations (adding, updating)
        for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          if (rows[rowIndex].length != 8) {
            rows[rowIndex].push(false);
          } else {
            rows[rowIndex][7] = true;
          }
          ordersdb.addOrder(
            rows[rowIndex][3],
            rows[rowIndex][5],
            rows[rowIndex][7]
          );
        }
        for (rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          var pickUpStatus = await ordersdb.checkAgainst(
            rows[rowIndex][3],
            rows[rowIndex][5]
          );
          rows[rowIndex][7] = pickUpStatus;
        }
        if (rows.length) {
          res.send(rows);
        } else {
          console.log("No data found.");
        }
      }
    );
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*
Create an OAuth2 client with the given credentials, and then execute the
given callback function.
@param {Object} credentials The authorization client credentials.
@param {function} callback The callback to call with the authorized client.
*/

/*
Get and store new token after prompting for user authorization, and then
execute the given callback with the authorized OAuth2 client.
@param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
@param {getEventsCallback} callback The callback for the authorized client.
*/

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
/* 
The file token.json stores the user's access and refresh tokens, and is
created automatically when the authorization flow completes for the first
time
*/
const TOKEN_PATH = "token.json";

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

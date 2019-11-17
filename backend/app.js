const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3001;
const db = require("./AnnouncementsQueries");
const cors = require("cors");
const fetch = require("node-fetch");
const { userId, basicAuth } = require("./config");
const readline = require("readline");
const { google } = require("googleapis");
var fs = require("fs");
const ordersdb = require("./orderquery");
app.use(cors());
app.use(bodyParser.json());

app.get("/inventory", async function(req, res) {
  res.send(await getId());
});

async function getId() {
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
  return await getInventory(idList, json);
}

async function getInventory(idList, json) {
  let list = [];
  for (let i = 0; i < json.data.length; i++) {
    //idList.push(json.data[i].relationships.options.data[0].id);
    let nestedDataLength = json.data[i].relationships.options.data.length;
    for (let n = 0; n < nestedDataLength; n++) {
      idList.push(json.data[i].relationships.options.data[n].id);
    }
  }
  var includedList = json.included.filter(e => e.type == "product_options");
  for (let i = 0; i < idList.length; i++) {
    var obj = includedList.filter(e => e.id == idList[i]);

    /*if (obj[0].attributes.name == "Default") {
      obj[0].attributes.name = json.date[i].attributes.name;
    }*/

    var x = [
      obj[0].attributes.name,
      //json.data[i].attributes.name,
      obj[0].attributes.quantity,
      obj[0].attributes.price,
      obj[0].attributes.sold
    ];
    list.push(x);
  }
  for (let i = 0; i < json.data.length; i++) {
    if (list[i][0] == "Default") {
      list[i][0] = json.data[i].attributes.name;
    }
  }

  console.log(list[0][0]);
  return list;
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/announcements", db.getAllAnnouncements);
app.get("/announcements/:id", db.getAnnouncement);
app.post("/announcements", db.createAnnouncement);
app.put("/announcements/:id", db.editAnnouncement);
app.delete("/announcements/:id", db.deleteAnnouncement);

app.get("/orders", function(req, res) {
  // Authorization
  fs.readFile("credentials.json", (err, content) => {
    if (err) console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), getSheetsData);
  });

  /**
   * Prints the order information from EthiCal's Google Sheet:
   * @see https://docs.google.com/spreadsheets/d/1ZNnltFhQluexcZrwWpuaIlMLtDQTeAI2WsoRHWgmELg/edit#gid=0
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
   */
  function getSheetsData(auth) {
    const sheets = google.sheets({ version: "v4", auth });
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: "1ZNnltFhQluexcZrwWpuaIlMLtDQTeAI2WsoRHWgmELg",
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

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
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

const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
const db = require("./orderquery");
const pg = require('pg');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var fs = require("fs");
app.get("/orders", function (req, res) {
  // Authorization
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
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
      (err, response) => {
        if (err) return console.log("The API returned an error: " + err);
        const rows = response.data.values;
        // const rows = [
        //   ["9/21", "aq", "trev", "123", "s", "shirt", "1", "X"],
        //   ["9/21", "sha", "parth", "124", "s", "shirt", "1"],
        //   ["9/21", "bra", "ami", "125", "s", "shirt", "1", "X"],
        //   ["9/21", "bra", "ami", "125", "s", "pants", "1", "X"],
        //   ["9/21", "bra", "ami", "125", "s", "pants", "1", "X"]
        // ];
        for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          if (rows[rowIndex].length != 8) {
            rows[rowIndex].push(false);
          } else {
            rows[rowIndex][7] = true;
          }
          db.addOrder(rows[rowIndex][3], rows[rowIndex][5], rows[rowIndex][7]);
        }
        for (var rowIndex2 = 0; rowIndex2 < rows.length; rowIndex2++) {
          //if just added, don't check pickup status
          db.checkAgainst(
            rows[rowIndex2][3],
            rows[rowIndex2][5],
            rows,
            rowIndex2
          );
          var resu = db.checkAgainst(
            rows[rowIndex2][3],
            rows[rowIndex2][5],
            rows,
            rowIndex2
          );
          // console.log("app:" + resu);
        }
        //   if (pickUpStatus != rows[rowIndex2][7]) {
        //     rows[rowIndex2][7] = pickUpStatus;
        //   }
        // }
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

const readline = require("readline");
const { google } = require("googleapis");
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

app.get("/ordersDB", db.getOrders);
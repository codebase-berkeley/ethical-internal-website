const dotenv = require("dotenv");
dotenv.config();

const Pool = require("pg").Pool;
//var fs = require("fs");
//var config = fs.readFileSync("config.json", "utf8");
//config = JSON.parse(config);
/*const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port
});*/

const user = process.env.mentored;
const host = process.env.host;
const database = process.env.database;
const password = process.env.password;
const port = process.env.port;

const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port
});

// Checks the pick up status of an order in the database
async function checkAgainst(gsOrder, gsItem) {
  try {
    const result = await pool.query(
      "SELECT * FROM order_table WHERE order_number = $1 AND item = $2",
      [gsOrder, gsItem]
    );
    return result.rows[0].picked_up;
  } catch (error) {
    console.error(error);
  }
}

// Adds an order to the database if it is not already in the database
const addOrder = (gsOrder, gsItem, gsPickUp) => {
  pool.query(
    "INSERT INTO order_table ( order_number, item, picked_up ) SELECT CAST( $1 AS TEXT) AS order_number, $2 AS item, $3 AS picked_up WHERE (NOT EXISTS( SELECT order_number, item FROM order_table WHERE order_number = $1 AND item = $2 ))",
    [gsOrder, gsItem, gsPickUp],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};

// Updates the pick up status in the database when the checkbox is clicked on the website
const updatePickUp = (request, response) => {
  const order_number = request.params.orderId;
  const { item, picked_up } = request.body;
  pool.query(
    "UPDATE order_table SET picked_up = $1 WHERE order_number = $2 AND item = $3",
    [picked_up, order_number, item],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .send(
          `Item ${item} with order number ${order_number} successfully updated`
        );
    }
  );
};

module.exports = {
  checkAgainst,
  addOrder,
  updatePickUp
};

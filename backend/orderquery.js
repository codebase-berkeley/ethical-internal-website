require("dotenv").config();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port
});

// Checks the pick up status of an order in the database
async function checkAgainst(gsOrder, gsItem, gsPickUp) {
  try {
    const result = await pool.query(
      "SELECT * FROM order_table WHERE order_number = $1 AND item = $2",
      [gsOrder, gsItem]
    );
    return gsPickUp || result.rows[0].picked_up;
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

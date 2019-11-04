const Pool = require("pg").Pool;
var fs = require("fs");
var config = fs.readFileSync("config.json", "utf8");
config = JSON.parse(config);
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port
});

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

async function rowCount() {
  const result = await pool.query("SELECT COUNT(*) FROM order_table");
  return result.rows[0]["count"];
}

async function newRowCount() {
  const result = await pool.query("SELECT COUNT(*) FROM order_table");
  return result.rows[0]["count"];
}

const addOrder = (gsOrder, gsItem, gsPickUp) => {
  pool.query(
    "INSERT INTO order_table ( order_number, item, picked_up ) SELECT CAST( $1 AS TEXT) AS order_number, $2 AS item, $3 AS picked_up WHERE (NOT EXISTS( SELECT order_number, item FROM order_table WHERE order_number = $1 AND item = $2 ))",
    [gsOrder, gsItem, gsPickUp],
    (error, results) => {
      if (error) {
        throw error;
      }
      //response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

const updatePickUp = (request, response) => {
  const { order_num, item, picked_up } = request.body;
  pool.query(
    "UPDATE order_table SET picked_up = NOT $1 WHERE order_num = $2 AND item = $3",
    [picked_up, order_num, item],
    (error, results) => {
      if (error) {
        throw error;
      }
      //response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const getOrders = (request, response) => {
  pool.query("SELECT * FROM order_table ", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  checkAgainst,
  addOrder,
  updatePickUp,
  getOrders,
  rowCount,
  newRowCount
};

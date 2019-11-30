require("dotenv").config();
//const db = require("db");
/*db.connect({
  userName: process.env.userName,
  userPassword: process.env.userPassword,
  userHost: process.env.userHost,
  userDatabase: process.env.userDatabase,
  userPort: process.env.userPort
});*/

const userName = process.env.userName;
const userPassword = process.env.userPassword;
const userHost = process.env.userHost;
const userDatabase = process.env.userDatabase;
const userPort = process.env.userPort;

/*
const {
  userName,
  userPassword,
  userHost,
  userDatabase,
  userPort
} = require("./config");
*/

const Pool = require("pg").Pool;
const pool = new Pool({
  user: userName,
  host: userHost,
  database: userDatabase,
  password: userPassword,
  port: userPort
});

const getAllAnnouncements = (req, res) => {
  pool.query(
    "SELECT * FROM announcements ORDER BY id DESC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getAnnouncement = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "SELECT * FROM announcements WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const createAnnouncement = (req, res) => {
  const { title, info } = req.body;
  pool.query(
    "INSERT INTO announcements (title, info) VALUES ($1, $2) RETURNING id",
    [title, info],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(201)
        .send(`Announcement created with ID: ${results.rows[0].id}`);
    }
  );
};

const editAnnouncement = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, info } = req.body;

  pool.query(
    "UPDATE announcements SET title = $1, info = $2 WHERE id = $3",
    [title, info, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Announcement modified with ID: ${id}`);
    }
  );
};

const deleteAnnouncement = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "DELETE FROM announcements WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Announcement deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  createAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  getAnnouncement
};

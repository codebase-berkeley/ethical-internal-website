const { userName } = require("./config");
const { userPassword } = require("./config");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: userName,
  host: "localhost",
  database: "ethical",
  password: userPassword,
  port: 5432
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
  console.log([title, info]);
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
  console.log(id);
  const { title, info } = req.body;

  pool.query(
    "UPDATE announcements SET title = $1, info = $2 WHERE id = $3",
    [title, info, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
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

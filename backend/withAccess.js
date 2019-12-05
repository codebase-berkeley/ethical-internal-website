require("dotenv").config;
const accessToken = process.env.accessToken;

const checkAccess = function(req, res) {
  const token = req.headers.accessToken;
  if (token == accessToken) {
    res.send(true);
  } else {
    res.send(false);
  }
};

module.exports = checkAccess;

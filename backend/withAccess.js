require("dotenv").config;
const accessToken = process.env.accessToken;

const checkAccess = function(req, res) {
  const token = req.headers.authorization;
  console.log(token);
  if (token == accessToken) {
    res.send(JSON.stringify({ result: true }));
  } else {
    res.send(JSON.stringify({ result: false }));
  }
};

module.exports = checkAccess;

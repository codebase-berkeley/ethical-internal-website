require("dotenv").config;
const accessToken = process.env.accessToken;

const checkAccess = function(req, res) {
  const token = req.headers.authorization;
  console.log(token);
  if (token == accessToken) {
    res.json(200, { result: "true" });
  } else {
    res.json({ result: "false" });
  }
};

module.exports = checkAccess;

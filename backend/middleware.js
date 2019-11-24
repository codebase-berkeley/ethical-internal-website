const { access_token } = require("./config");
const cookieParser = require("cookie-parser");

const withAuth = function(req, res, next) {
  const token = cookieParser.token;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else if (token == access_token) {
    next();
  } else {
    res.status(401).send("Unauthorized: Invalid token");
    next();
  }
};

module.exports = withAuth;

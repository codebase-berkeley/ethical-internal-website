const { access_token } = require("./config");

const withAuth = function(req, res, next) {
  const token = req.cookies.token;
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

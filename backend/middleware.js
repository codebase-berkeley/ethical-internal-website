require("dotenv").config;
const accessToken = process.env.accessToken;

const withAuth = function(req, res, next) {
  const token = req.headers.authorization;
  if (token == accessToken) {
    next();
  } else {
    res.status = 401;
    res.send(res.status);
  }
};

module.exports = withAuth;

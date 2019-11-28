const { access_token } = require("./config");

const withAuth = function(req, res, next) {
  const token = req.headers.authorization;
  if (token == access_token) {
    next();
  } else {
    let path = "/login";
    this.props.history.push(path);
  }
};

module.exports = withAuth;

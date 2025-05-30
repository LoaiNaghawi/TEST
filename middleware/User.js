const fs = require("fs");
module.exports = (req, res, next) => {
  let user = JSON.parse(fs.readFileSync("./json/users.json", "utf8"));
  let userFilter = user.filter((user) => user.username == req.query.user);
  if (userFilter.length < 1) {
    return res.redirect("/notAuthorized");
  }
  next();
};

const fs = require("fs");

const roles = {
  admin: 3,
  mod: 2,
  user: 1,
};

const categories = {
  Furniture: 1,
  Electronics: 2,
  HomeAndKitchen: 3,
};

// let roles1 = JSON.parse(fs.readFileSync("./json/roles.json", "utf8"));
// let rolesNames = JSON.parse(fs.readFileSync("./json/roles.json", "utf8")).map(
//   (r) => r.name
// );
// let roleIds = roles1.map((r) => r.id);

// let adminRole = roleIds[rolesNames.indexOf("admin")];

// let modRole = roleIds[rolesNames.indexOf("moderator")];

// let userRole = roleIds[rolesNames.indexOf("user")];

exports.getMain = (req, res, next) => {
  res.setHeader("Content-Type", "text/plain");
  res.end(`Hello, I am doing so much habd!`);
};

exports.notAuth = (req, res, next) => {
  res.setHeader("Content-Type", "text/plain");
  res.end(`You are not authorized to use this API!`);
};

exports.getData = (req, res, next) => {
  try {
    let data = JSON.parse(fs.readFileSync("./json/users.json", "utf8"));
    const keysToRemove = ["id", "roleId"];
    mappedData = data.map((user) => {
      const newUser = { ...user };
      keysToRemove.forEach((key) => delete newUser[key]);
      return newUser;
    });
    res.json(mappedData);
  } catch (error) {
    console.log(error);
  }
};

exports.postItems = (req, res, next) => {
  try {
    let data = fs.readFileSync("./items.txt", "utf8");
    fs.writeFileSync("./Items.txt", data + "\n" + req.query.name, (err) => {
      if (err) console.log(err);
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.getItems = (req, res, next) => {
  try {
    let data = JSON.parse(fs.readFileSync("./json/items.json", "utf8"));
    let users = JSON.parse(fs.readFileSync("./json/users.json", "utf8"));
    let userAdmin = users.filter((user) => {
      return user.roleId == roles.admin && user.username == req.query.user;
    });
    let userMod = users.filter((user) => {
      return user.roleId == roles.mod && user.username == req.query.user;
    });
    let userNormal = users.filter((user) => {
      return user.roleId == roles.user && user.username == req.query.user;
    });
    let resultingItems = [];
    if (userAdmin.length >= 1) {
      resultingItems = data.filter((item) => {
        return item.catID == categories.Furniture;
      });
    }
    if (userMod.length >= 1) {
      resultingItems = data.filter((item) => {
        return item.catID == categories.Electronics;
      });
    }
    if (userNormal.length >= 1) {
      return res.end(`You don't have permission to view any items!`);
    }
    res.json(resultingItems);
  } catch (error) {
    console.log(error);
  }
};

const Sequelize = require("sequelize");
const config = require("../datasources/config.json");

const db = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
  dialect: config.db.dialect,
  }
);

// definiuj modele
const models = [
  "aids",
  "users",
  "categories",
];

models.forEach(model => {
  module.exports[model] = db.import(__dirname + "/models/" + model);
});

(m => {
  // definiuj relacje
})(module.exports);

module.exports.db = db;

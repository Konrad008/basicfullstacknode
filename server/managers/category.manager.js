const repository = require("../repositories/category.repository");
const routeHandler = require("../services/routeHandler");

class categoryManager{
}

module.exports = {
  defaultManager: new routeHandler(repository),
  categoryManager: new categoryManager()
};

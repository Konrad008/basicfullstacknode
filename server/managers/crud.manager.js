const repository = require("../repositories/crud.repository");
const routeHandler = require("../services/routeHandler");

class crudManager{
}

module.exports = {
  defaultManager: new routeHandler(repository),
  crudManager: new crudManager(),
};

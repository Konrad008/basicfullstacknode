const repository = require("../repositories/category.repository");
const routeHandler = require("../services/routeHandler");
const jwt = require("../services/jwt.service");

class categoryManager {
  add() {
    return (req, res, next) => {
      req.body.uid = jwt.decodeHeader(req).uid;

      repository
        .add(req)
        .then(data => {
          res.json(data ? data : {});
        })
        .catch(err => {
          next(err);
        });
    };
  }

  edit() {
    return async (req, res, next) => {
      req.body.uid = jwt.decodeHeader(req).uid;
      const item = await repository.getOne(req);

      if (item) {
        await repository
          .edit(req)
          .then(data => {
            res.json(data ? data : {});
          })
          .catch(err => {
            next(err);
          });
      } else {
        return res.status(400).json({
          message: "Ten post nie jest Twój!"
        });
      }
    };
  }

  delete() {
    return async (req, res, next) => {
      req.body.uid = jwt.decodeHeader(req).uid;
      req.body.id = req.params.id;
      const item = await repository.getOne(req);

      if (item) {
        await repository
          .delete(req)
          .then(data => {
            res.json(data ? data : {});
          })
          .catch(err => {
            next(err);
          });
      } else {
        return res.status(400).json({
          message: "Ten post nie jest Twój!"
        });
      }
    };
  }
}

module.exports = {
  defaultManager: new routeHandler(repository),
  categoryManager: new categoryManager()
};

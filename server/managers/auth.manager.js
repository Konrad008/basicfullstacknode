const repository = require("../repositories/user.repository");
const routeHandler = require("../services/routeHandler");
const jwt = require("../services/jwt.service");
const bcrypt = require("bcryptjs");

class authManager {
  authenticate() {
    return (req, res, next) => {
      repository
        .findByUsername(req.body.username)
        .then(user => {
          const { password } = req.body;
          if (user && bcrypt.compareSync(password, user.hash)) {
            const { hash, ...userWithoutHash } = user;
            const token = jwt.sign(user.id, { uid: user.id });

            res.json({
              ...userWithoutHash,
              token
            });
          } else {
            res
              .status(400)
              .json({ message: "Niepoprawny użytkownik lub hasło" });
          }
        })
        .catch(err => next(err));
    };
  }

  register() {
    return (req, res, next) => {
      if (req.body.password === "") {
        res.status(400).json({ message: "Hasło nie może być puste!" });
      }
      repository
        .findByUsername(req.body.username)
        .then(user => {
          if (user) {
            res.status(400).json({
              message:
                'Nazwa użytkownika - "' + req.body.username + '" jest już zajęta!'
            });
          }
        })
        .catch(err => next(err));

      repository
        .create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
    };
  }
}

module.exports = {
  defaultManager: new routeHandler(repository),
  authManager: new authManager()
};

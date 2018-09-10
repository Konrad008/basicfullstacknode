const bcrypt = require("bcryptjs");
const seq = require("../datasources/database");

module.exports = {
  findByUsername,
  create,
  getAll,
};

async function findByUsername(username) {
  return await seq.users.findOne({
    where: { username: username, show: true, delete: false },
    raw: true
  });
}

async function create(userParam) {
  const user = seq.users
    .build({
      firstName: userParam.firstName,
      lastName: userParam.lastName,
      username: userParam.username,
      password: bcrypt.hashSync(userParam.password, 10)
    })
    .save();
}

async function getAll() {
  return await seq.users
    .findAll({
      attributes: {exclude: ["hash"]},
      where: {show: true, delete: false}
    });
}
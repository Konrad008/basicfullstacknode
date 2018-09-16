const seq = require("../datasources/database");

module.exports = {
  get,
  getOne,
  add,
  edit,
  delete: _delete
};

async function getOne(req) {
  return await seq.categories
    .findOne({
      where: {
        delete: false,
        show: true,
        uid: req.body.uid,
        id: req.body.id
      }
    })
    .then(resp => (resp ? resp.dataValues : false));
}

async function get(req) {
  return await seq.categories.findAll({
    where: {
      delete: false,
      show: true
    }
  });
}

async function add(req) {
  return await seq.categories
    .build(req.body)
    .save()
    .then(resp => (resp ? resp.dataValues : false));
}

async function edit(req) {
  await seq.categories.update(
    {
      category: req.body.category
    },
    {
      where: { id: req.params.id }
    }
  );
}

async function _delete(req) {
  await seq.categories.update(
    {
      delete: true,
      show: false
    },
    {
      where: { id: req.params.id }
    }
  );
}

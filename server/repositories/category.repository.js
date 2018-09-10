const seq = require("../datasources/database");

module.exports = {
  getAll,
  add,
  edit,
  _delete
};

async function getAll(req) {
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
    .then(resp => resp.dataValues);
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

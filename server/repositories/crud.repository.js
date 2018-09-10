const seq = require("../datasources/database");

module.exports = {
  insert,
  view,
  edit,
  _delete
};

async function insert(req) {
  const data = req.body;

  return await seq.aids
    .build({
      name: data.name,
      description: data.description,
      user: data.user,
      category: data.category,
      quantity: data.quantity
    })
    .save()
    .then(res => res.dataValues);
}

async function view() {
  return await seq.aids.findAll({
    where: { show: true, delete: false }
  });
}

async function _delete(req) {
  return await seq.aids.update(
    {
      show: false,
      delete: true
    },
    {
      where: {
        id: req.query.id
      }
    }
  );
}

async function edit(req) {
  const data = req.body;

  return await seq.aids.update(
    {
      name: data.name,
      description: data.description,
      user: data.user,
      category: data.category,
      quantity: data.quantity
    },
    {
      where: { id: data.id }
    }
  );
}

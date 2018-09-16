const seq = require("../datasources/database");

module.exports = {
  get,
  getOne,
  add,
  edit,
  delete: _delete
};

async function getOne(req) {
  return await seq.aids
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

async function add(req) {
  return await seq.aids
    .build(req.body)
    .save()
    .then(res => (res ? res.dataValues : false));
}

async function get() {
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

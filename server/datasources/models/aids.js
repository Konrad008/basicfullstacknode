module.exports = (sequelize, DataTypes) => {
  return sequelize.define("aids", {
    show: {
      type: DataTypes.BOOLEAN,
      required: true,
      defaultValue: true
    },
    delete: {
      type: DataTypes.BOOLEAN,
      required: true,
      defaultValue: false
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    user: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: DataTypes.STRING,
    uid: DataTypes.INTEGER
  });
};

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("categories", {
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
    category: DataTypes.STRING,
    uid: DataTypes.INTEGER
  });
};

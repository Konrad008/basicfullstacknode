module.exports = (sequelize, DataTypes) => {
  return sequelize.define("users", {
    show: {
      type: DataTypes.BOOLEAN,
      required: true,
      defaultValue: true
    },
    delete: {
      type: DataTypes.BOOLEAN,
      required: true,
      defaultValue: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      required: true
    },
    hash: {
      type: DataTypes.STRING,
      required: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
};

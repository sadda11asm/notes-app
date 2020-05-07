"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    timestamps: false
  });

  User.associate = function (models) {
    User.hasMany(models.Note, {
      foreignKey: 'user_id',
      as: 'notes'
    });
  };

  return User;
};
//# sourceMappingURL=user.js.map
"use strict";

module.exports = function (sequelize, DataTypes) {
  var Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  Note.associate = function (models) {
    Note.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    }); // associations can be defined here
  };

  return Note;
};
//# sourceMappingURL=note.js.map
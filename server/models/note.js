module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    text: {
      type: DataTypes.TEXT, 
      allowNull: true
    }
  }, {
    timestamps:true
  });
  
  Note.associate = (models) => {
    Note.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
    // associations can be defined here
  };

  return Note;
};
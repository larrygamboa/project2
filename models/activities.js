module.exports = function(sequelize, DataTypes) {
    var Activities = sequelize.define("Activities", {
      activity_name: DataTypes.STRING,
      a_condition: DataTypes.BOOLEAN}, { 
      timestamps: false,
    });
    return Activities;
  };
  
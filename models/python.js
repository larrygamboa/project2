module.exports = function(sequelize, DataTypes) {
    var Python = sequelize.define("Python", {
      python_name: DataTypes.STRING,
      python_condition: DataTypes.BOOLEAN}, { 
      timestamps: false,
      freezeTableName: true,
    });
    return Python;
  };
  
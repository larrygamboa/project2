module.exports = function(sequelize, DataTypes) {
    var Php = sequelize.define("Php", {
      php_name: DataTypes.STRING,
      php_condition: DataTypes.BOOLEAN}, { 
      timestamps: false,
      freezeTableName: true,
    });
    return Php;
  };
  
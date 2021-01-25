module.exports = function(sequelize, DataTypes) {
  var Css = sequelize.define("Css", {
    css_name: DataTypes.STRING,
    css_condition: DataTypes.BOOLEAN}, { 
    timestamps: false,
  });
  return Css;
};
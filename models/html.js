// Creating and exporting Css model
module.exports = function(sequelize, DataTypes) {
  var Html = sequelize.define(
    "Html",
    {
      html_name: DataTypes.STRING,
      html_condition: DataTypes.BOOLEAN,
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Html;
};

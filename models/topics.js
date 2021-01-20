module.exports = function(sequelize, DataTypes) {
  var Topics = sequelize.define(
    "Topics",
    {
      topic_name: DataTypes.STRING,
      t_condition: DataTypes.BOOLEAN,
    },
    {
      timestamps: false,
    }
  );
  return Topics;
};

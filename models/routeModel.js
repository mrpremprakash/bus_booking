module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Route",
    {
      RouteID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RouteName: DataTypes.STRING,
      TotalDistance: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
};

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Stop",
    {
      StopID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      StopName: DataTypes.STRING,
      Latitude: DataTypes.FLOAT,
      Longitude: DataTypes.FLOAT,
    },
    {
      timestamps: false,
    }
  );
};

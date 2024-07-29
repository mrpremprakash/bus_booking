module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Bus",
    {
      BusID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      BusRegNo: DataTypes.STRING,
      Latitude: DataTypes.INTEGER,
      Longitude: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
};

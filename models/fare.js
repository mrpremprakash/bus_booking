module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Fare', {
      RouteID: { type: DataTypes.INTEGER, references: { model: 'BusRoute', key: 'RouteID' } },
      BaseFare: DataTypes.FLOAT,
      FarePerKM: DataTypes.FLOAT,
      ServiceType: DataTypes.STRING
    },
    {
      timestamps: false,
    });
  };
  
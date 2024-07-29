module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Fare', {
      RouteID: { type: DataTypes.INTEGER, references: { model: 'Route', key: 'RouteID' } },
      BaseFare: DataTypes.FLOAT,
      FarePerKM: DataTypes.FLOAT,
      ServiceType: DataTypes.STRING
    },
    {
      timestamps: false,
    });
  };
  
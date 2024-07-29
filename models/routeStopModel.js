module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RouteStop', {
      RouteID: { type: DataTypes.INTEGER, references: { model: 'Route', key: 'RouteID' } },
      StopID: { type: DataTypes.INTEGER, references: { model: 'Stop', key: 'StopID' } },
      StopOrder: DataTypes.INTEGER,
      DistanceFromPrevious: DataTypes.INTEGER
    },
    {
      timestamps: false,
    });
  };
  
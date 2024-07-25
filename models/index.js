const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('bus_booking', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.BusRoute = require('./busRoute')(sequelize, DataTypes);
db.Stop = require('./stop')(sequelize, DataTypes);
db.RouteStop = require('./routeStop')(sequelize, DataTypes);
db.Fare = require('./fare')(sequelize, DataTypes);
// Define associations (if any)

db.BusRoute.belongsToMany(db.Stop, { through: db.RouteStop, foreignKey: 'RouteID' });
db.Stop.belongsToMany(db.BusRoute, { through: db.RouteStop, foreignKey: 'StopID' });
// Export db
module.exports = db;

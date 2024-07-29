const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('sql12722637', 'sql12722637', 'cph272PyfG', {
//   host: 'sql12.freesqldatabase.com',
//   dialect: 'mysql',
//   define: {
//     freezeTableName: true,
//   }
// });

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
db.Route = require('./routeModel')(sequelize, DataTypes);
db.Stop = require('./stopModel')(sequelize, DataTypes);
db.RouteStop = require('./routeStopModel')(sequelize, DataTypes);
db.Fare = require('./fareModel')(sequelize, DataTypes);
db.BusesRoute = require('./busModel')(sequelize, DataTypes);
// Define associations (if any)

db.Route.belongsToMany(db.Stop, { through: db.RouteStop, foreignKey: 'RouteID' });
db.Stop.belongsToMany(db.Route, { through: db.RouteStop, foreignKey: 'StopID' });
// Export db
module.exports = db;

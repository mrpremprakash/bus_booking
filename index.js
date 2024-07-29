const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models');
const busRoutes = require('./routes/busRoutes');
const fareRoutes = require('./routes/fareRoutes');
const Route = require('./routes/routes')

// Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', busRoutes);
app.use('/api', fareRoutes);
app.use('/api', Route);

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});



module.exports = app;
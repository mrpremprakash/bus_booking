const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models');
const busRoutes = require('./routes/busRoutes');
const fareRoutes = require('./routes/fareRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', busRoutes);
app.use('/api', fareRoutes);

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

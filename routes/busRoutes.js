const express = require('express');
const router = express.Router();
const db = require('../models');

// Example route to get all bus routes
router.get('/busRoutes', async (req, res) => {
  try {
    const busRoutes = await db.BusRoute.findAll();
    res.json(busRoutes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to get stops by route ID
router.get('/routes/:routeId/stops', async (req, res) => {
  const { routeId } = req.params;
  try {
    const route = await db.BusRoute.findByPk(routeId, {
      include: {
        model: db.Stop,
        through: {
          attributes: ['StopOrder', 'DistanceFromPrevious']
        }
      }
    });
    
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    
    res.json(route.Stops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

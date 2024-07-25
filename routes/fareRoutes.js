const express = require("express");
const router = express.Router();
const db = require("../models");

// Route to calculate fare based on from and to stops
router.post("/calculate-fare", async (req, res) => {
  const { routeId, fromStopId, toStopId } = req.body;

  try {
    const route = await db.BusRoute.findByPk(routeId, {
      include: {
        model: db.Stop,
        through: {
          attributes: ["StopOrder", "DistanceFromPrevious"],
        },
      },
    });

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }
    // console.log(route.Stops);
    // Find the stops in the route
    const fromStop = route.Stops.find(
      (stop) => stop.dataValues.StopID === fromStopId
    );
    const toStop = route.Stops.find(
      (stop) => stop.dataValues.StopID === toStopId
    );

    if (!fromStop || !toStop) {
      return res.status(404).json({ message: "Stops not found in the route" });
    }

    // Ensure the from stop comes before the to stop in the route
    if (fromStop.RouteStop.StopOrder > toStop.RouteStop.StopOrder) {
      return res
        .status(400)
        .json({ message: '"From" stop should be before "To" stop' });
    }

    // Calculate the total distance between the stops
    let totalDistance = 0;
    let calculating = false;
    for (const stop of route.Stops) {
      console.log(stop.dataValues);
      if (stop.dataValues.StopID === fromStopId) {
        calculating = true;
      }

      if (calculating) {
        totalDistance += stop.dataValues.RouteStop.dataValues.DistanceFromPrevious;
      }

      if (stop.dataValues.StopID === toStopId) {
        break;
      }
    }

    // Fetch the fare details for the route
    const fareDetails = await db.Fare.findOne({ where: { RouteID: routeId } });

    if (!fareDetails) {
      return res
        .status(404)
        .json({ message: "Fare details not found for the route" });
    }

    // Calculate the fare
    const totalFare =
      fareDetails.BaseFare + totalDistance * fareDetails.FarePerKM;

    res.json({
      totalDistance,
      totalFare,
      serviceType: fareDetails.ServiceType,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/buses", async (req, res) => {
  try {
    const buses = await db.BusesRoute.findAll();
    res.json(buses);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post("/update-bus-location", async (req, res) => {
  const { busId, latitude, longitude } = req.body;

  try {
    const response = await db.BusesRoute.update(
      { Latitude: latitude, Longitude: longitude },
      { where: { BusID: busId } }
    );
    console.log(response);

    res.json({
      busId,
      latitude,
      longitude,
    });
  } catch (error) {}
});
module.exports = router;

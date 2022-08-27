const express = require("express");
const router = express.Router();
const { jumbleText, getFlightData } = require("../helpers");

// Confirm request with jumbled text
router.post("/text", async (req, res) => {
  try {
    const body = req.body;
    const text = body.text;
    const textJumbled = jumbleText(text);
    const data = { text: textJumbled, time: new Date().toISOString() };
    res.send(data);
  } catch (error) {
    res.status(404).send({ message: "Cannot confirm at this time" });
  }
});

// Get Flight data with puppeteer
router.post("/flights", async (req, res) => {
  try {
    const flightData = await getFlightData();
    const data = { data: flightData, time: new Date().toISOString() };
    res.send(data);
  } catch (error) {
    res.status(404).send({ message: "Cannot get flight data at this time" });
  }
});

module.exports = router;

const express = require("express");

// router object
const router = express.Router();

// Function to configure the router with the db
module.exports = (db) => {
  // Import the controller and pass the db to it
  const { sendEmailController } = require("../controllers/portfolioController");

  // routes
  router.post("/sendEmail", sendEmailController(db));

  return router;
};

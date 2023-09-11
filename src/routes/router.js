const express = require("express");
const authenticationController = require("../controller/auth");

module.exports = (app) => {
  const applicationRoute = express.Router();

  applicationRoute.use("authentification", authenticationController);

  return applicationRoute;
};

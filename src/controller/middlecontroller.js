const middleware = require("../middleware/middleware");

const middlecontroller = (req, res) => {
    res.send("Hello world!");
  };
  
  module.exports = [middlecontroller, middleware];
  
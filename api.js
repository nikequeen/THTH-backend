const express = require("express");
const router1 = require("./src/routes/route1");
const app = express();

const port = 3030;
app.use("/", router1);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

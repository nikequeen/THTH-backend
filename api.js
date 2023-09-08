const express = require("express");
const router1 = require("./src/routes/route1");
const out = require("./src/controller/out");
const app = express();

const port = 3040;
app.use("/", router1);
app.use("/", out);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

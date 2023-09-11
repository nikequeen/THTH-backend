const app = require("./app");
const port = 3040

app.listen(port, () => {
  console.log("listening on port: http://localhost:"`${port}`);
});

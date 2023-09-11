const app = require("./app");
const port = 3040;

app.listen(port, () => {
  console.log(`Listening on port: http://localhost:${port}`);
});

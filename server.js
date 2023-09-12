const app = require('./app'); 
const port = process.env.PORT || 3040;

app.listen(port, () => {
  console.log(`Listening on port: ${port}, host: http://localhost:${port}`);
});

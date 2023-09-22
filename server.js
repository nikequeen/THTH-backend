const app = require('./app'); 
const port = process.env.PORT || 3040;

app.listen(7850
, () => {
  console.log(`Listening on port: ${port}, host: http://localhost:${port}`);
});

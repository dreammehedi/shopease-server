const app = require("./app");
const connectDb = require("./configuration/dbConfig");
const { currentPort } = require("./secure");

// listen on port 5000
app.listen(currentPort, () => {
  console.log(`Server running on port ${currentPort}`);
  // database connection
  connectDb();
});

const app = require("./app");
const { currentPort } = require("./secure");

// listen on port 5000
app.listen(currentPort, () => {
  console.log(`Server running on port ${currentPort}`);
});

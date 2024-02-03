const app = require("./app");
const dbConnect = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
dbConnect(process.env.CONN_STR);

app.listen(PORT, "localhost", () => {
  console.log(`Server running on port ${PORT}`);
});

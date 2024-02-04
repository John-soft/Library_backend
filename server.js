const app = require("./app");
const dbConnect = require("./utils/db");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
dbConnect(process.env.MONGO_URI);

app.listen(PORT, "localhost", () => {
  console.log(`Server running on port ${PORT}`);
});

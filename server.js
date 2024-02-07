const app = require("./app");
const dbConnect = require("./utils/db");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
dbConnect(
  "mongodb+srv://admin:gHR3RTd3M6zT2d52@cluster0.a4dxzy6.mongodb.net/library-backend?retryWrites=true&w=majority"
);

app.listen(PORT, "localhost", () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const errorHandler = require("./middleware/errorhandler");
require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbconnection");
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json()); // Add this to parse JSON requests
app.use(cors());
const carRouters = require("./routes/carRentalRoutes");
const userRouters = require("./routes/userRoutes");
app.use("/api", userRouters);
app.use("/api", carRouters);
app.use(errorHandler);

app.listen(port, async () => {
 await connectDB();
  console.log(`Server running on port ${port}`);
});

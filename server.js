const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// User Routes
app.use("/api/v1/users", userRoutes);

// transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoute"))

// path to build folder
app.use(path.join(__dirname, './client/build'))
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// Connect to Database and Start Server
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Database connection failed:", error));

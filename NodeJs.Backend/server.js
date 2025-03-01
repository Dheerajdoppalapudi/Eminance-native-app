const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const postRoutes = require("./src/routes/postRoutes");
const setupSwagger = require("./swagger"); 
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); 

app.use("/api/", authRoutes);
app.use("/drone/", postRoutes);

setupSwagger(app); 

app.get("/", (req, res) => {
  res.send("Node.js API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

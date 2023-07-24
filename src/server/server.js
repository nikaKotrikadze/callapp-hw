const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3333; // You can use any desired port number

// Middleware to parse JSON data from the request body
app.use(express.json());

// Read JSON data from the file
// ... (Your existing readDataFromFile and writeDataToFile functions)

// API endpoints
// ... (Your existing API endpoints for getting, adding, updating, and deleting data)

// Serve the React app from the build folder
app.use(express.static(path.join(__dirname, "data.json")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "data.json"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

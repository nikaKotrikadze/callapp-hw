const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import the cors package
const app = express();
const PORT = 3333; // You can use any desired port number

// Middleware to parse JSON data from the request body
app.use(express.json());

// Use the cors middleware to handle CORS
app.use(cors());

// Read JSON data from the file
function readDataFromFile() {
  const rawData = fs.readFileSync("data.json");
  return JSON.parse(rawData);
}

// Write JSON data to the file
function writeDataToFile(data) {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
}

// API endpoint to get all data
app.get("/api/data", (req, res) => {
  const data = readDataFromFile();
  res.json(data);
});

// API endpoint to add new data
app.post("/api/data", (req, res) => {
  const data = readDataFromFile();
  const newData = req.body;
  const lastItem = data[data.length - 1];
  newData.id = lastItem ? lastItem.id + 1 : 1;
  data.push(newData);
  writeDataToFile(data);
  res.json(newData);
});

// API endpoint to update data by ID
app.put("/api/data/:id", (req, res) => {
  const data = readDataFromFile();
  const { id } = req.params;
  const updatedData = req.body;
  const index = data.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    data[index] = { ...data[index], ...updatedData };
    writeDataToFile(data);
    res.json({ data: data[index] });
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

// API endpoint to delete data by ID
app.delete("/api/data/:id", (req, res) => {
  const data = readDataFromFile();
  const { id } = req.params;
  const index = data.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    data.splice(index, 1);
    writeDataToFile(data);
    res.json({ message: "Data deleted successfully" });
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

// Serve the React app from the build folder (make sure to run 'npm run build' for your React app first)
app.use(express.static(path.join(__dirname, "client/build")));

// All other requests not handled by the API endpoints will be served the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File path
const dataPath = path.join(__dirname, "data", "data.txt");

// Ensure data folder exists
if (!fs.existsSync(path.join(__dirname, "data"))) {
  fs.mkdirSync(path.join(__dirname, "data"));
}

// Write to file (persistent via Docker volume)
fs.appendFileSync(dataPath, `Server Started ${new Date()}\n`);
console.log("Data written to file.");

// Express route
app.get("/", (req, res) => {
  res.send("Hello from the server v4.1!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

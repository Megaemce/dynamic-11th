// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the _site directory (the default output directory of 11ty)
app.use(express.static(path.join(__dirname, "_site")));

// Example of a dynamic API route
app.get("/api/*", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

// Catch-all handler to serve the index.html for any request that doesn't match an API route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "_site", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

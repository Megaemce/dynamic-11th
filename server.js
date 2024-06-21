const express = require("express");
const { kv } = require("@vercel/kv");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the _site directory (the default output directory of 11ty)
app.use(express.static(path.join(__dirname, "_site")));

// Middleware to parse JSON bodies
app.use(express.json());

// Basic health check
app.get("/api/", (req, res) => res.json({ message: "Hello from Express!" }));

// Get the likes count
app.get("/api/:postTitle/likes", async (req, res) => {
    try {
        const { postTitle } = req.params;
        const likes =
            (await kv.hget(postTitle, "likes")) ||
            (await kv.hget(postTitle, "likes", 0));

        res.json({ likes: likes });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting likes count!");
    }
});

// Update the likes count
app.post("/api/:postTitle/likes", async (req, res) => {
    try {
        const { postTitle } = req.params;
        const likes = await kv.hincrby(postTitle, "likes", 1);

        res.json({ likes: likes });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating likes count!");
    }
});

// Get the view and increment them. Every request is a new view
app.get("/api/:postTitle/views", async (req, res) => {
    try {
        const { postTitle } = req.params;
        const views = await kv.hincrby(postTitle, "views", 1);

        res.json({ views: views });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting post views!");
    }
});

// Catch-all handler to serve the index.html for any request that doesn't match an API route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "_site", "index.html"));
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;

require("dotenv").config();

console.log("API KEY =", process.env.GNEWS_API);

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/news", async (req, res) => {

    const category = req.query.category || "general";

    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&apikey=${process.env.GNEWS_API}`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

app.get("/search", async (req, res) => {

    const q = req.query.q;

    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&apikey=${process.env.GNEWS_API}`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

app.listen(PORT, () => {

    console.log("Server Running on", PORT);

});

console.log(process.env.GNEWS_API);
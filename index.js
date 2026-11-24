const express = require("express");
const app = express();
const apiKey = "ZjwrjdVqbBteJiYyEUCQAWSlFfbaXVra";

const endpoints = [
    "stations",
    "datasets",
    "datacategories",
    "datatypes",
    "locationcategories",
    "locations",
    "data",
];

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.get("/style.css", (req, res) => res.sendFile(__dirname + "/style.css"));
app.get("/script.js", (req, res) => res.sendFile(__dirname + "/script.js"));

app.get("/:endpoint", (req, res) => {
    const endpoint = req.params.endpoint;
    if (!endpoints.includes(endpoint))
        return res.status(404).json({ error: "Nieznany endpoint" });

    const query = new URLSearchParams(req.query).toString();

    fetch(`https://www.ncei.noaa.gov/cdo-web/api/v2/${endpoint}?${query}`, {
        headers: { token: apiKey },
    })
        .then((response) => response.json())
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ error: String(error) }));
});

app.listen(5000, () => console.log("Serwer dziala"));

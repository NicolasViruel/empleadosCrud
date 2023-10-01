const express = require("express");
const cors = require("cors");
const app= express();


const router = require("../server/routes/index")

//configure HEADER HTTP - CORS
app.use(cors());
app.use(express.json());

//base route path
const apiRoute = process.env.API_URL || '/api';

app.use(apiRoute, router)


module.exports = app;
//Import modules
const express = require('express');
const noteRoutes = require('./notes.js');

//Initialize the express app
const app = express();

//Use the noteRoutes for the /api route
app.use('/api', noteRoutes);

module.exports = app;
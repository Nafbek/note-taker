const express = require('express');


const noteRoutes = require('./notes.js');


const app = express();



app.use('/api', noteRoutes);



module.exports = app;
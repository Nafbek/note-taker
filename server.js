//Imports modules and custom middleware
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/index.js');
const clog = require('./middleware/clogs.js');

const PORT = 3001;

//Initialize the express app
const app = express();

//middleware for parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Use the custom clog middleware 
app.use(clog)

//Use the apiRoute middleware
app.use('/', apiRoutes)

app.use(express.static('public'))

//Handle get request for the root url
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//Handle get request for the /note url
app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.listen(PORT, ()=>{
    console.log(`The app listens at http://localhost:${PORT}`)
})
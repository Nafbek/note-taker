const express = require('express');
const path = require('path');
const clog = require('./middleware/clogs.js');
const apiRoutes = require('./routes/index.js');



const PORT = 3001;

const app = express();

//middleware for parsing

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(clog)

app.use('/', apiRoutes)


app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})


app.listen(PORT, ()=>{
    console.log(`The app listens at http://localhost:${PORT}`)
})
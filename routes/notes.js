//imports modules 
const notes = require('express').Router();
const {readFromFile, appendToFile, writeToFile} = require('../helpers/fsUtils')
//Import library to generate id 
const shortid = require('shortid')

//Defines a get route to read the content
notes.get('/notes', (req, res)=>{
    readFromFile('./db/db.json')
    .then((data)=> res.json(JSON.parse(data)))
    .catch((err)=> console.log(err))
})

//Defines a post route
notes.post('/notes', (req, res)=> {
    const {title, text} = req.body;

    //Check the existence of the body and create a new note along with the id
    if(title && text) {
        const newNote = {
            title,
            text,
           id:shortid.generate()
        }
        appendToFile('./db/db.json', newNote)
        .then(()=> res.json('Your note is added!'))
        .catch((err)=> console.log(err)) 
       
    }else {
        res.status(400).json({error:'Error encountered!'})
    }
})

//Defines a delete route
notes.delete('/notes/:id', (req, res)=> {
    const noteId = req.params.id;

    readFromFile('./db/db.json')
    .then((data)=> {
       
        const parsedNotes = JSON.parse(data)
      
        //Check whether a note with a given id found in the array and then delete it
        const notesIndex = parsedNotes.findIndex((note)=>note.id ===noteId)
        if(notesIndex !== -1) {
            parsedNotes.splice(notesIndex, 1)

            //Write the modified content to the file
              writeToFile('./db/db.json', JSON.stringify(parsedNotes))
        .then(()=> res.json({update: 'Your note has been deleted'}))
        .catch((err)=> console.log(err))
        }else {
            res.status(404).json({error: 'Note is not found'})
        }
    })
    .catch((err)=> console.log('Error', err))
})

module.exports = notes;
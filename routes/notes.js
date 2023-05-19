const notes = require('express').Router();
const {readFromFile, appendToFile, writeToFile} = require('../helpers/fsUtils')
const shortid = require('shortid')


// //write file and create api

notes.get('/notes', (req, res)=>{
    readFromFile('./db/db.json')
    .then((data)=> res.json(JSON.parse(data)))
    .catch((err)=> console.log(err))

})

notes.post('/notes', (req, res)=> {
    const {title, text} = req.body;
    if(title && text) {
        const newNote = {
           
            title,
            text,
           id:shortid.generate()

        }
        appendToFile('./db/db.json', newNote)
        .then(()=> res.json('Your note is added!'))
        .catch((err)=> console.log(err)) //do i really need this error handler here???????????
       
    }else {
        res.status(400).json({error:'Error encountered!'})
    }
})


notes.delete('/notes/:id', (req, res)=> {
    const noteId = req.params.id;

    readFromFile('./db/db.json')


    .then((data)=> {
        // console.log("data form file", data)
        const parsedNotes = JSON.parse(data)
      
        const notesIndex = parsedNotes.findIndex((note)=>note.id ===noteId)

        if(notesIndex !== -1) {
            parsedNotes.splice(notesIndex, 1)
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
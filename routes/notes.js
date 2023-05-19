const notes = require('express').Router();
const {readFromFile, appendToFile, writeToFile} = require('../helpers/fsUtils')
const shortid = require('shortid')


// //write file and create api
// * GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you?????????????????????????????????????????).

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

    console.log(readFromFile('./db/db.json'))
    .then((data)=> {
        const notes = JSON.parse(data)
        const notesIndex = notes.findIndex((note)=>note.id ===noteId)

        if(notesIndex !== -1) {
            notes.splice(notesIndex, 1)
              writeToFile('./db/db.json', notes)
        .then(()=> res.json({update: 'Your note has been deleted'}))
        .catch((err)=> console.log(err))
        }else {
            res.status(404).json({error: 'Note is not found'})
        }
    })
    .catch((err)=> console.log('Error', err))


})

module.exports = notes;
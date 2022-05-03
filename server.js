// IMPORT EXPRESS
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const PORT = 3001;
// DECLARE VARIABLE FOR EXPRESS
const app = express();

// SET UP EXPRESS DATA FOR DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// HTML ROUTE, GET METHOD
// GET ROUTE FOR HOMEPAGE
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// ROUTE FOR NOTES PAGE
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// MAKE PROMISE VERSION OF FS.READFILE
const readFromFile = util.promisify(fs.readFile);

// FS.WRITEFILE
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

// APPENDS CONTENT FROM FILE
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

// API ROUTE
// GET ROUTE
app.get('/api/notes', (req, res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST ROUTE
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    // IF ALL REQUIRED PROPERTIES ARE PRESENT
    if (title && text) {
        // VARIABLE FOR NEW SAVED NOTE
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, './db/db.json')
        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

// DELETE ROUTE

app.delete('/api/notes/:id', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        const notes = JSON.parse(data);
        // FILTER NOTES, KEEP EVERYTHING THAT DOES NOT MATCH ID
        const updateNote = notes.filter(note => note.id != req.params.id)
        // REWRITE FILE, WITH UPDATED DATA
        fs.writeFile('./db/db.json', JSON.stringify(updateNote, null, 4), (err) =>
        err ? console.error(err) : res.send(200)
        );
    })
    
});


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

// WILDCARD ROUTE TO 404
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
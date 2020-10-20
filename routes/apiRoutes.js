const router = require("express").Router();
const fs = require("fs")

router.get("/notes", (req, res) => {
    const notes = fs.readFileSync("./db/db.json", "utf8")
    return res.json(JSON.parse(notes))
});

router.post("/notes", (req, res) => {
    const notesPost = req.body;
    notesPost.id = Math.random()
    console.log(notePost);

    const notes = fs.readFileSync("./db/db.json", "utf8")
    const notesArray = JSON.parse(notes);
    notesArray.push(notesPost);

    fs.writeFile("./db/db.json", JSON.stringify(notesArray), (err) => {
        if (err) throw err
        
        return res.json(true);
    })
});

router.delete('/notes/:id', function (req, res) {
    const id = req.params.id;
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const filteredNotes = notes.filter(note => note.id != id);

    fs.write('./db/db.json', JSON.stringify(filteredNotes), (error) => {
        if (error)
            res.json(false).status(500);
        res.json(true);
    });
});

module.exports = router;
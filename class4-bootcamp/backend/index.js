const express = require("express");

const app = express();

let notes = [
  {
    "id": 1,
    "content": "Me tengo que suscribir a @midudev en YouTube y Twitch",
    "date": "2019-05-30T17:30:31.098Z",
    "important": true
  },
  {
    "id": 2,
    "content": "Tengo que estudiar las clases del FullStack Bootcamp",
    "date": "2019-05-30T18:39:34.091Z",
    "important": false
  },
  {
    "id": 3,
    "content": "Repasar los retos de JS de midudev",
    "date": "2019-05-30T19:20:14.298Z",
    "important": true
  }
];

app.get("/", (request, response) => {
    response.send("<h1>Hello world</h1>");
});

app.get("/api/notes", (request, response) => {
    response.json(notes);
})

app.get("/api/notes/:id", (request, response) => {
    const id =  request.params.id;
    const note = notes.find((note) => note.id === Number(id))

    note ? response.json(note) : response.status(404).end()
})

app.delete("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    notes = notes.filter((note) => note.id !== Number(id))

    response.status(204).end()
})

const PORT = 3001;
app.listen(PORT, () => {console.log("Port listening on port " + PORT)} );

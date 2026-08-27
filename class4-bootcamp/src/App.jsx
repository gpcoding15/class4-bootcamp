import { useState } from "react";
import { Notes } from "./components/Notes";

export const App = ({notes = []}) => {
  const [ noteChecks, setNoteChecks ] = useState(notes);
  const [ newNote, setNewNote ] = useState("");
  const [ allNotesDisplayed, setAllNotesDisplayed ] = useState(true)

  const handleNotesChange = (e) => setNewNote(e.target.value);

  const handleOnSubmitNote = () => {
    event.preventDefault()
    const newNotesToAdd = {
      id: noteChecks.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    setNoteChecks((prevNotes) => {
     return [...prevNotes, newNotesToAdd]
    });
    setNewNote("")
  };

  const handleAllNotesDisplayedClick = () => {
    setAllNotesDisplayed(!allNotesDisplayed)
  }


  if (typeof notes === "undefined" || typeof notes === "undefined"  || notes.length === 0) return <p>No notes to show</p>
  return (
    <div>
      <form onSubmit={handleOnSubmitNote}>
        <input type="text" placeholder="Add note" onChange={handleNotesChange} value={newNote}/>
        <button>Add note</button>
      </form>
      <br/>
    
      <h1>Notes:</h1>
       
      <ul>
        {noteChecks
          .filter((note) => {
            if (allNotesDisplayed) return true
            return note.important
          })
          .map((note) => <Notes key={note.id} content={note.content} />)}
      </ul>
      <button onClick={handleAllNotesDisplayedClick}>{allNotesDisplayed ? "Show only important notes" : "Show all notes"}</button>
      
      
    </div>
    
  )
}
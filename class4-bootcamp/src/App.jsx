import { useState, useEffect } from "react";
import { Notes } from "./components/Notes";


export const App = () => {
  const [ noteChecks, setNoteChecks ] = useState([]);
  const [ newNote, setNewNote ] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const formatted_response = await response.json()
        setNoteChecks(formatted_response)
      }catch(e) {
        console.log(e.message)
      }
    }
    fetchData()
  }, [noteChecks])
  const handleNotesChange = (e) => setNewNote(e.target.value);

  const handleOnSubmitNote = (event) => {
    event.preventDefault()
    const newNotesToAdd = {
      id: noteChecks.length + 1,
      title: newNote,
      body: newNote
    }
    setNoteChecks((prevNotes) => {
     return [...prevNotes, newNotesToAdd]
    });
    setNewNote("")
  };


  // if (typeof notes === "undefined" || typeof notes === "undefined"  || notes.length === 0) return <p>No notes to show</p>
  return (
    <div>
      <form onSubmit={handleOnSubmitNote}>
        <input type="text" placeholder="Add note" onChange={handleNotesChange} value={newNote}/>
        <button>Add note</button>
      </form>
      <br/>
    
      <h1>Notes:</h1>
       
      <ul>
        {noteChecks.map((note) => <Notes key={note.id} title={note.title} body={note.body} />)}
      </ul>
      
      
    </div>
    
  )
}
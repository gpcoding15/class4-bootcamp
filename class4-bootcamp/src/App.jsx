import { useState, useEffect } from "react";
import { Notes } from "./components/Notes";


export const App = () => {
  const [ noteChecks, setNoteChecks ] = useState([]);
  const [ newNote, setNewNote ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const formatted_response = await response.json()
        setNoteChecks(formatted_response)
      }catch(e) {
        console.log(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

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

  return (
    <div>
      <h1>Notes:</h1>
      {isLoading ? "Notes are loading" : 
      <><form onSubmit={handleOnSubmitNote}>
          <input type="text" placeholder="Add note" onChange={handleNotesChange} value={newNote} />
          <button>Add note</button>
        </form>
        <ul>
            {noteChecks.map((note) => <Notes key={note.id} title={note.title} body={note.body} />)}
          </ul></>
      
      }
    </div>
    
  )
}
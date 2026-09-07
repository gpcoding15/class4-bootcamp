import { useState, useEffect } from "react";
import { Notes } from "./components/Notes";
import { getAllNotes, createNote } from "./services/notes/allNotes";


export const App = () => {
  const [ noteChecks, setNoteChecks ] = useState([]);
  const [ newNote, setNewNote ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true)
  const [ error, setError ] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("")
        const data = await getAllNotes()
        setNoteChecks(data)
      }catch(e) {
        console.error(e.message)
        setError("The service is down")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleNotesChange = (e) => setNewNote(e.target.value);

  const handleOnSubmitNote = async (event) => {
    event.preventDefault()
     const newNotesToAdd = {
      content: newNote,
      important: false
    }
    try {
        setError("")
        const note = await createNote(newNotesToAdd)
        setNoteChecks((prevNotes) => {
          return [...prevNotes, note]
        });

    } catch (e){
      console.error(e.message)
      setError("Service not available")
      console
    }
   
    setNewNote("")
  };

  const handleToggleImportant = (id) => {
    setNoteChecks((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, important: !note.important } : note
      )
    )
  };

  return (
    <div className="app">
      <h1>Notes:</h1>
      {isLoading ? <p className="loading">Notes are loading</p> :
      <><form className="notes-form" onSubmit={handleOnSubmitNote}>
          <input type="text" placeholder="Add note" onChange={handleNotesChange} value={newNote} />
          <button>Add note</button>
        </form>
        <ul className="notes-list">
            {noteChecks.map((note) => (
              <Notes
                key={note.id}
                content={note.content}
                important={note.important}
                onToggleImportant={() => handleToggleImportant(note.id)}
              />
            ))}
          </ul></>

      }
      {error ? <p className="error">{error}</p> : ""}
    </div>

  )
}
import { useState, useEffect } from "react";
import axios from 'axios';
import { Notes } from "./components/Notes";
import { getAllNotes } from "./services/notes/allNotes";


export const App = () => {
  const [ noteChecks, setNoteChecks ] = useState([]);
  const [ newNote, setNewNote ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
       const data = await getAllNotes()
        setNoteChecks(data)
      }catch(e) {
        console.log(e.message)
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
      id: noteChecks.length + 1,
      title: newNote,
      body: newNote
    }
    try {
        const response = await axios.post("https://jsonplaceholder.typicode.com/posts", newNotesToAdd)
        setNoteChecks((prevNotes) => {
          return [...prevNotes, response.data]
        });

    } catch (e){
      console.log(e.message)
    }
   
    // 
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
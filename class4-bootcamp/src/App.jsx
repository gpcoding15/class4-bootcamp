import { Courses } from "./components/Courses";
import { Notes } from "./components/Notes";
const notes = [
  {
    id: 1,
    content: "Repasar las preguntas para la entrevista con DevRev",
    date: "2026-08-25T10:30:00",
    important: true
  },
  {
    id: 2,
    content: "Avanzar con el proyecto del bootcamp de Midudev (Node + React)",
    date: "2026-08-25T14:00:00",
    important: true
  },
  {
    id: 3,
    content: "Módulo del curso de UX/UI de Google",
    date: "2026-08-25T18:15:00",
    important: false
  },
  {
    id: 4,
    content: "Ir al gimnasio y tomar unos mates",
    date: "2026-08-25T19:30:00",
    important: false
  }
];

 const courses = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }


export const App = () => {
  if (typeof notes === "undefined" || typeof notes === "undefined"  || notes.length === 0) return <p>No notes to show</p>
  return (
    <div>
      <h1>Notes:</h1>
      <ul>
        {notes.map((note) => <Notes key={note.id} content={note.content}/>)}
      </ul>

      <h1>Courses:</h1>
      <ul>
        {courses.parts.map((course) => <Courses key={course.id} name={course.name} exercises={course.exercises}/>)}
      </ul>
      <p><strong>Total tasks: {courses.parts.length}</strong></p>
    </div>
    
  )
}
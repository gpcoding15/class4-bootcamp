import { createRoot } from 'react-dom/client'
import { App } from './App'

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



createRoot(document.getElementById('root')).render(
    <App notes={notes}/>
)

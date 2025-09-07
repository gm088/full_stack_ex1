import { useState, useEffect } from 'react'
import noteService from './notes_utilities'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
  <li>
    {note.content}
    <button onClick={toggleImportance}>{label}</button>
  </li>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  

  useEffect(() => {
    noteService.getAllNotes().
    then( returnedValue => {
      setNotes(returnedValue)
    } )
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    //send to server with post
    //the response.data has the same thing we sent
    noteService.postNote(noteObject)
    .then(response => {
      setNotes(notes.concat(response))
      console.log(response)
    })

    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  //HTTP PUT replaces the note, HTTP PATCH changes an attribute
  const toggleImportanceOf = (id) => {
    
    const url = `http://localhost:3001/notes/${id}`
    const relnote = notes.find(note => note.id === id)  //this is just the one note obj
    const chnote = { ...relnote, important: !relnote.important }  //creating a new obj changing ONE attr.
  
    // now update in server with PUT
    noteService.updateNote(id, chnote)
    .then(response => {
      setNotes(notes.map( n => n.id === id ? response : n))
    })

    console.log(`changed importance of note ${id}`)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={ () => toggleImportanceOf(note.id) } />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App

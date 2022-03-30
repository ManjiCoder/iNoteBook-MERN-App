import React, { useContext } from 'react'
import NoteContext from './context/notes/NotesContext'; //  Importing NoteContext

function Home() {
  const context = useContext(NoteContext);  //  useContext
  const { notes, setNotes } = context;      //  Array Destructing
  return (
    <div>
      <div className="container my-3">
        <h1>Add A Note</h1>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="container my-3">
        <h1>Your Notes</h1>
      </div>

      {/* Map Method on Notes */}
      {notes.map((note) => {
        return (`${note.title}, `)
      })}

    </div>
  )
}

export default Home
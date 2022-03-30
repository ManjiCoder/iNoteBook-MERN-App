import React, { useContext, useEffect } from 'react'
import NoteContext from './context/notes/NotesContext';

function About() {
  const a = useContext(NoteContext);

  useEffect(() => {
    a.update();
  }, [])

  return (
    <div>About & My name is {a.state.name} & I am in class {a.state.class} </div>
  )
}

export default About
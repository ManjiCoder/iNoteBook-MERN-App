import { useState } from "react";
import NoteContext from "./NotesContext";   //  Importing NoteContext

const NoteState = (props) => {
    // const state = {
    //     "name": "Harry",
    //     "class": "B"
    // }
    const s1 = {
        "name": "Harry",
        "class": "B"
    }

    const [state, setState] = useState(s1)

    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Naresh",
                "class": "EXTC"
            })
        }, 2000);
    }

    return (
        <NoteContext.Provider value={{ state: state, update: update }}>
            {/* <NoteContext.Provider value={{ state, update }}>(Modern JavaScript)  === value={{ state: state, update: update }} */}
            {/* <NoteContext.Provider value={state}> */}
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
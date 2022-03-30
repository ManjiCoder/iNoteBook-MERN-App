import { useState } from "react";
import NoteContext from "./NotesContext";   //  Importing NoteContext

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "6240b7132ee76124a993f087",
            "user": "623b738413571398465a18bc",
            "title": "Link Vs NavLink",
            "description": "NavLink check whether it's active or not",
            "tag": "coding",
            "date": "2022-03-27T19:12:19.702Z",
            "__v": 0
        },
        {
            "_id": "6240b872b066cea12b990850",
            "user": "623b738413571398465a18bc",
            "title": "NavLink Vs Link",
            "description": "NavLink check whether it's active or not",
            "tag": "React",
            "date": "2022-03-27T19:18:10.252Z",
            "__v": 0
        },
        {
            "_id": "6240b9156620115f4a77cbe3",
            "user": "623b738413571398465a18bc",
            "title": "NavLink Vs Link",
            "description": "NavLink check whether it's active or not",
            "tag": "React.js",
            "date": "2022-03-27T19:20:53.662Z",
            "__v": 0
        },
        {
            "_id": "6240b9206620115f4a77cbe6",
            "user": "623b738413571398465a18bc",
            "title": "NavLink Vs Link",
            "description": "NavLink check whether it's active or not",
            "tag": "coding",
            "date": "2022-03-27T19:21:04.788Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;   //  Exporting NoteState
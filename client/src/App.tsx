import { useState, useEffect } from "react";
import { Note as NoteMotel } from "./models/note";
import { getNotes } from "./services/requester";
import { Notes } from "./components/Notes";

function App() {
    const [notes, setNotes] = useState<NoteMotel[]>([]);

    useEffect(() => {
        getNotes().then((res) => {
            setNotes(res);
        });
    }, []);

    return (
        <div>
            {notes.map((note) => (
                <Notes note={note} key={note._id} />
            ))}
        </div>
    );
}

export default App;

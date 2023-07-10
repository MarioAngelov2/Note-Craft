import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Note as NoteMotel } from "./models/note";
import * as NotesApi from "./services/requester";
import { Notes } from "./components/Notes";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import { AddEditNoteDialog } from "./components/CreateEditNote";
import { FaPlus } from "react-icons/fa";

function App() {
    const [notes, setNotes] = useState<NoteMotel[]>([]);
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteMotel | null>(null);

    useEffect(() => {
        async function loadNotes() {
            try {
                const response = await NotesApi.fetchNotes();
                setNotes(response);
            } catch (error) {
                console.log(error);
            }
        }
        loadNotes();
    }, []);

    async function deleteNote(note: NoteMotel) {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(
                notes.filter((existingNote) => existingNote._id !== note._id)
            );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid="xl">
            <Button
                className={`mb-4 mt-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
                onClick={() => setShowAddNoteDialog(true)}
            >
                <FaPlus />
                Add new note
            </Button>
            <Row xs={1} md={2} xl={3} xxl={4} className="g-4">
                {notes.map((note) => (
                    <Col key={note._id}>
                        <Notes
                            note={note}
                            className={styles.note}
                            onDeleteNote={deleteNote}
                            onNoteClicked={setNoteToEdit}
                        />
                    </Col>
                ))}
            </Row>
            {showAddNoteDialog && (
                <AddEditNoteDialog
                    onClose={() => setShowAddNoteDialog(false)}
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddNoteDialog(false);
                    }}
                />
            )}
            {noteToEdit && (
                <AddEditNoteDialog
                    noteToEdit={noteToEdit}
                    onClose={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        setNotes(
                            notes.map((existingNote) =>
                                existingNote._id === updatedNote._id
                                    ? updatedNote
                                    : existingNote
                            )
                        );
                        setNoteToEdit(null);
                    }}
                />
            )}
        </Container>
    );
}

export default App;

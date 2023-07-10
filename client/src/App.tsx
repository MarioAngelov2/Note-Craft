import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Note as NoteMotel } from "./models/note";
import { getNotes } from "./services/requester";
import { Notes } from "./components/Notes";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";

function App() {
    const [notes, setNotes] = useState<NoteMotel[]>([]);

    useEffect(() => {
        getNotes().then((res) => {
            setNotes(res);
        });
    }, []);

    return (
        <Container fluid="xl">
            <Row xs={1} md={2} xl={3} xxl={4} className="g-4">
                {notes.map((note) => (
                    <Col key={note._id}>
                        <Notes note={note} className={styles.note}/>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default App;

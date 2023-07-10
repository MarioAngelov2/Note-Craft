import styles from "../styles/Note.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";
import * as NoteApi from "../services/requester";

export interface NotesProps {
    onNoteClicked: (note: NoteModel) => void;
    note: NoteModel;
    onDeleteNote: (note: NoteModel) => void;
    className?: string;
}

export function Notes({
    note,
    onNoteClicked,
    className,
    onDeleteNote,
}: NotesProps) {
    const { title, text, _id, createdAt, updatedAt } = note;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card
            className={`${styles.noteCard} ${className}`}
            onClick={() => onNoteClicked(note)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}{" "}
                    <MdDelete
                        onClick={(e: any) => {
                            onDeleteNote(note);
                            e.stopPropagation();
                        }}
                        className="text-muted ms-auto"
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>{text}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    );
}

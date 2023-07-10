import * as React from "react";
import styles from "../styles/Note.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";

export interface NotesProps {
    note: NoteModel;
}

export function Notes({ note }: NotesProps) {
    const { title, text, _id, createdAt, updatedAt } = note;

    return (
        <Card className={styles.noteCard}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text className={styles.cardText}>{text}</Card.Text>
            </Card.Body>
        </Card>
    );
}

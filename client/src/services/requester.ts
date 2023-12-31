import { Note } from "../models/note";

const URL = `http://localhost:5001/api/notes/`;

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);

    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData(URL, { method: "GET" });
    return response.json();
}

export interface NoteInput {
    title: string;
    text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
}

export async function deleteNote(id: string) {
    await fetchData(URL + id, {
        method: "DELETE",
    });
}

export async function updateNote(id: string, note: NoteInput): Promise<Note> {
    const response = await fetchData(URL + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
}

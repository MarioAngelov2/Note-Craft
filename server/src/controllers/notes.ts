import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNoteById: RequestHandler = async (req, res, next) => {
    const id = req.params.id;

    try {
        const note = await NoteModel.findById(id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

interface CreateNoteBody {
    title?: string;
    text?: string;
}

export const createNotes: RequestHandler<
    unknown,
    unknown,
    CreateNoteBody,
    unknown
> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.title;

    try {
        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

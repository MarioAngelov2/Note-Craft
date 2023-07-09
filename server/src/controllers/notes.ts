import { RequestHandler } from "express";
import NoteModel from "../models/note";

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
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

export const createNotes: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.title;

    try {
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

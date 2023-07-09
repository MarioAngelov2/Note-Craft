import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

router.get("/", NotesController.getNotes);

router.post("/", NotesController.createNotes);

router.get("/:id", NotesController.getNoteById);

router.patch("/:id", NotesController.updateNote);

router.delete("/:id", NotesController.deleteNote);

export default router;

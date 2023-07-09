import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import getNotes from "./routes/notes";

const app = express();

app.use('/api/notes', getNotes)

app.use((req, res, next) => {
    next(Error("Endpoint not found."));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "An uknown error occurred";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
});

export default app;

import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import getNotes from "./routes/notes";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/notes", getNotes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found."));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "An uknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;

import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
    .connect(env.MONGO_CONNECT_STRING)
    .then(() => {
        console.log("Database connected");
        app.listen(port, () => {
            console.log("Server is listening on port: " + port);
        });
    })
    .catch(console.error);

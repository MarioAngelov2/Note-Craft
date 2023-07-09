import express from "express";

const app = express();
const port = 5001;

app.get("/", (req, res) => {
    res.render("Hello World");
});

app.listen(port, () => {
    console.log("Server is listening on port: " + port);
});

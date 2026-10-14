/*
Phillip Onofua | Student ID: 101489064 | COMP3123 Lab 6

Purpose:
Set up the root route (/).
Set up JSON and URL-encoded middleware.
Mount the notes routes.
Connect to MongoDB Atlas before starting the server.
*/

const express = require("express");
const mongoose = require("mongoose");
const notesRoutes = require("./routes/notesRoutes.js");

const PORT = process.env.PORT || 8081;

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  console.error("DB_URL is missing. Run: node --env-file=.env server.js");
  process.exit(1);
}

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up the root route (/)
app.get("/", (request, response) => {
  response.send("<h1>Welcome to the root path of the server</h1>");
});

//Set up our route to routes set up in the routes/notesRoutes.js file
app.use("/api", notesRoutes);

// Return a clear error for malformed JSON and other request errors.
app.use((error, request, response, next) => {
  if (response.headersSent) return next(error);
  const status = error.type === "entity.parse.failed" ? 400 : 500;
  response.status(status).send({
    message: status === 400 ? "Invalid JSON body" : "Server Error",
  });
});

// Connect to MongoDB before listening for requests.
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Successfully connected to the mongoDB Atlas Server");
    app.listen(PORT, () => {
      console.log(`Server listening at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("Could not connect to the MongoDB server");
    process.exit(1);
  });

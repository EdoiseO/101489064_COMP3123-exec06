/*
Phillip Onofua | Student ID: 101489064 | COMP3123 Lab 6

Purpose;
Set up all of the routes/paths for our server
*/

const express = require("express");

const router = express.Router();

const NotesModel = require("../models/NotesModel.js");

// POST http://localhost:8081/api/notes
router.post("/notes", async (request, response) => {
  // Validation of the POST body
  if (!request.body?.content || typeof request.body.content !== "object" ||
      Array.isArray(request.body.content)) {
    return response.status(400).send({
      message: "Note content in the POST body cannot be left empty",
    });
  }

  // Create and save a note using the POST body content
  try {
    const note = new NotesModel({
      noteTitle: request.body.content.noteTitle,
      noteDescription: request.body.content.noteDescription,
      priority: request.body.content.priority,
      dateAdded: request.body.content.dateAdded,
      dateUpdated: request.body.content.dateUpdated,
    });

    const savedNote = await note.save();
    return response.status(201).send(savedNote);
  } catch (error) {
    return response.status(error.name === "ValidationError" ? 400 : 500).send({
      message: error.name === "ValidationError" ? error.message :
        "Some error occurred while creating the note.",
    });
  }
});

// GET http://localhost:8081/api/notes — GET requests do not need a body.
router.get("/notes", async (request, response) => {
  try {
    const notes = await NotesModel.find();
    return response.status(200).send(notes);
  } catch (error) {
    return response.status(500).send({ message: "Could not retrieve notes" });
  }
});

// GET http://localhost:8081/api/notes/:noteId
router.get("/notes/:noteId", async (request, response) => {
  try {
    const note = await NotesModel.findById(request.params.noteId);
    if (!note) {
      return response.status(404).send({ message: "Note not found" });
    }
    return response.status(200).send(note);
  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;
    return response.status(status).send({
      message: status === 400 ? "Invalid note ID" : "Could not retrieve the note",
    });
  }
});

// PUT http://localhost:8081/api/notes/:noteId
router.put("/notes/:noteId", async (request, response) => {
  if (!request.body?.content || typeof request.body.content !== "object" ||
      Array.isArray(request.body.content) ||
      Object.keys(request.body.content).length === 0) {
    return response.status(400).send({
      message: "Note content in the PUT body cannot be left empty",
    });
  }

  try {
    const note = await NotesModel.findByIdAndUpdate(request.params.noteId, {
      noteTitle: request.body.content.noteTitle,
      noteDescription: request.body.content.noteDescription,
      priority: request.body.content.priority,
      dateAdded: request.body.content.dateAdded,
      dateUpdated: request.body.content.dateUpdated,
    }, { new: true, runValidators: true });

    if (!note) {
      return response.status(404).send({ message: "Note not found" });
    }
    return response.status(200).send(note);
  } catch (error) {
    const status = ["CastError", "ValidationError"].includes(error.name) ? 400 : 500;
    return response.status(status).send({
      message: error.name === "CastError" ? "Invalid note ID" :
        error.name === "ValidationError" ? error.message : "Could not update the note",
    });
  }
});

// DELETE http://localhost:8081/api/notes/:noteId — only delete the selected note.
router.delete("/notes/:noteId", async (request, response) => {
  try {
    const note = await NotesModel.findByIdAndDelete(request.params.noteId);
    if (!note) {
      return response.status(404).send({ message: "Note not found" });
    }
    return response.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;
    return response.status(status).send({
      message: status === 400 ? "Invalid note ID" : "Could not delete the note",
    });
  }
});

module.exports = router;

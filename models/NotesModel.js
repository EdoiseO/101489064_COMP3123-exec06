/*
Phillip Onofua | Student ID: 101489064 | COMP3123 Lab 6

Purpose

Define the table in JSON format for Mongo & Mongoose
*/

const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true,
  },
  noteDescription: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["HIGH", "LOW", "MEDIUM"],
  },
  dateAdded: {
    type: String,
    required: true,
  },
  dateUpdated: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("NotesSchema", NotesSchema);

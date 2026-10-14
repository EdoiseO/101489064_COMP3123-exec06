# COMP3123 Lab Exercise 6 — Notes API

Phillip Onofua | Student ID: 101489064 | COMP3123 Lab 6

Node.js, Express 5.1.0 and Mongoose 8.19.1 CRUD API connected to MongoDB Atlas.

## Run

1. Run `npm install` in this folder.
2. Copy `.env.example` to `.env` and replace `DB_URL` with your own Atlas connection string. Keep `.env` private. Add your current IP address to your Atlas project's access list.
3. With Node.js 20.6 or newer, run `node --env-file=.env server.js`.
4. Wait for the MongoDB connection and port 8081 messages before testing.

The server listens only after MongoDB connects. If `DB_URL` is already set in your terminal environment, `node server.js` also works.

## Postman tests

Use `http://localhost:8081` and select **Body → raw → JSON** for POST and PUT. GET and DELETE do not require a body.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` | Welcome page |
| POST | `/api/notes` | Create a note; returns 201 and its `_id` |
| GET | `/api/notes` | List all notes |
| GET | `/api/notes/:noteId` | Retrieve one note |
| PUT | `/api/notes/:noteId` | Update one note; returns the updated document |
| DELETE | `/api/notes/:noteId` | Delete the selected note |

Use the `_id` returned by your POST response for the single-note requests. Test deletion only with a note you created for testing.

POST body from the Week 06 course material:

```json
{
  "content": {
    "noteTitle": "Sample Note Title",
    "noteDescription": "Sample Note Description",
    "priority": "HIGH",
    "dateAdded": "06/Oct/2025",
    "dateUpdated": "06/Oct/2025"
  }
}
```

PUT body:

```json
{
  "content": {
    "noteTitle": "Updated Note Title",
    "noteDescription": "This note has been updated",
    "priority": "MEDIUM",
    "dateAdded": "06/Oct/2025",
    "dateUpdated": "13/Oct/2026"
  }
}
```

All five fields are required strings. Priority accepts `HIGH`, `LOW` or `MEDIUM`. Dates retain the strings supplied in the course example. Missing content, schema validation failures, malformed JSON and invalid IDs return 400. A valid ID with no matching note returns 404. Unexpected server/database errors return 500.

Submit the source ZIP `101489064_COMP3123-exec06.zip`, separate genuine Postman screenshots, and the required GitHub repository link. Exclude `.env` and `node_modules` from the ZIP and repository.

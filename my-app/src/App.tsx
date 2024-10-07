import "./App.css";
import { Label } from "./types";
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import React, { useState, useEffect } from "react";
import Heart from "react-heart";

function App() {
  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: "" as Label,
    favorite: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [editNoteId, setEditNoteId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleFavorite = (id: number) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, favorite: !note.favorite } : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const favoriteNotes = notes.filter((note) => note.favorite);

  function handleCreateNote(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (editNoteId !== null) {
      const updatedNotes = notes.map((note) =>
        note.id === editNoteId ? { ...createNote, id: editNoteId } : note
      );
      setNotes(updatedNotes);
      setEditNoteId(null);
    } else {
      const newNote = {
        ...createNote,
        id: notes.length ? notes[notes.length - 1].id + 1 : 1,
      };
      setNotes([...notes, newNote]);
    }
    setCreateNote(initialNote);
  }

  function handleEditNote(note: typeof initialNote) {
    setCreateNote(note);
    setEditNoteId(note.id);
  }
  function handleCancelEdit() {
    setCreateNote(initialNote);
    setEditNoteId(null);
  }
  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <div>
        <form
          className={`note-form ${darkMode ? "dark-mode" : ""}`}
          onSubmit={handleCreateNote}
        >
          <div>
            <input
              className={darkMode ? "dark-mode" : ""}
              placeholder="Note Title"
              value={createNote.title}
              onChange={(e) =>
                setCreateNote({ ...createNote, title: e.target.value })
              }
              required
            ></input>
          </div>

          <div>
            <textarea
              className={darkMode ? "dark-mode" : ""}
              value={createNote.content}
              onChange={(e) =>
                setCreateNote({ ...createNote, content: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div>
            <select
              className={darkMode ? "dark-mode" : ""}
              value={createNote.label || ""}
              onChange={(event) =>
                setCreateNote({
                  ...createNote,
                  label: event.target.value as Label,
                })
              }
              required
            >
              <option value="" disabled>
                {" "}
                Select a label
              </option>
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div>
            <button type="submit">
              {editNoteId !== null ? "Update Note" : "Create Note"}
            </button>
            {editNoteId !== null && (
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}{" "}
          </div>
        </form>

        <div className="favorite-notes">
          <h3>Favorite Notes</h3>
          <ul>
            {favoriteNotes.map((note) => (
              <li key={note.id}>{note.title}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`notes-grid ${darkMode ? "dark-mode" : ""}`}>
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note-item ${darkMode ? "dark-mode" : ""}`}
          >
            <div className="notes-header">
              <div className="icon-container" style={{ width: "1rem" }}>
                <Heart
                  className={`fav-button ${darkMode ? "dark-mode" : ""}`}
                  isActive={note.favorite}
                  onClick={() => toggleFavorite(note.id)}
                  activeColor={darkMode ? "#ff0000" : "#ff5a5f"}
                  inactiveColor={darkMode ? "#555555" : "#d3d3d3"}
                />
              </div>
              <button
                className={`edit-button ${darkMode ? "dark-mode" : ""}`}
                onClick={() => handleEditNote(note)}
              >
                Edit
              </button>

              <button
                className={`delete-button ${darkMode ? "dark-mode" : ""}`}
                onClick={() => deleteNote(note.id)}
              >
                X
              </button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.label}</p>
          </div>
        ))}
      </div>
      <button
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
        style={{ position: "fixed", bottom: "10px", right: "10px" }}
      >
        Dark Mode
      </button>
    </div>
  );
}

export default App;

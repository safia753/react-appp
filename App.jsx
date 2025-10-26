import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrEdit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    if (editId) {
      // Edit note
      setNotes(notes.map(note => note.id === editId ? { ...note, text } : note));
      setEditId(null);
    } else {
      // Add new note
      const newNote = { id: Date.now(), text };
      setNotes([...notes, newNote]);
    }

    setText("");
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEdit = (id) => {
    const note = notes.find(n => n.id === id);
    setText(note.text);
    setEditId(id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Notes App</h1>

      <form onSubmit={handleAddOrEdit} style={styles.form}>
        <input
          type="text"
          placeholder="Write a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <ul style={styles.list}>
        {notes.length === 0 && <p style={styles.empty}>No notes yet...</p>}
        {notes.map((note) => (
          <li key={note.id} style={styles.note}>
            <span>{note.text}</span>
            <div>
              <button onClick={() => handleEdit(note.id)} style={styles.editBtn}>
                ✏️
              </button>
              <button onClick={() => handleDelete(note.id)} style={styles.deleteBtn}>
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    background: "#18407dff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px #ccc",
    textAlign: "center",
  },
  heading: { marginBottom: "20px" },
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #aaa",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  list: { listStyle: "none", padding: 0 },
  note: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#1b2651ff",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "8px",
  },
  editBtn: {
    marginRight: "5px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },
  deleteBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },
  empty: { color: "#777" },
};

export default App;

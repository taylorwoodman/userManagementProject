import React from "react";
import axios from "axios";
import SingleNote from "./singleNote";
import "./notes.css";

class Notes extends React.Component {
  constructor() {
    super();

    this.state = {
      allNotes: []
    };
  }

  componentDidMount = () => {
    axios.get("/notes")
    .then(response => {
      this.setState({ allNotes: response.data })
    })
    .catch(console.error)
  }

  handleCreate = () => {
    const body = {
      user_id: this.props.id,
    }
    axios.post("/addNote", body)
    .then(response => this.setState({allNotes: response.data}))
    .catch(console.error)
  }

  updateNotes = (notes) => {
    this.setState({allNotes: notes})
  }

  render() {
    if(!this.props.id) return "Loading..."
    const notesList = this.state.allNotes.map((note) => {
      return (
        <div key={note.id} className="notes">
      <SingleNote
      id={note}
      note={note}
      text={note.note}
      allNotes={this.state.allNotes}
      updateNotes={this.updateNotes}
      />
      </div>
    )})
    return (
      <div className="container">
        <button
        className="edit"
        onClick={this.handleCreate}
        >New Note
        </button>
        <div className="notesContainer">{notesList}</div>
      </div>
    );
  }
}

export default Notes;

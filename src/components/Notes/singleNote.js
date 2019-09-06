import React from "react";
import axios from "axios";
import "./notes.css";

class SingleNote extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      text: props.note.note
    }
  }

  

  handleSave = (id, text) => {
    const body = {
      note: text
    }
    
    axios.put(`/updateNote/${id}`, body)
    .then(() => axios.get("/notes"))
    .then(response => {alert('Note saved!')
    this.props.updateNotes(response.data)})
    .catch(console.error)
  }

  handleDelete = (id) => {
    axios.delete(`/deleteNote/${id}`)
    .then(() => axios.get("/notes"))
    .then(response => this.props.updateNotes(response.data))
    .catch(console.error)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="singleNote">
        <button
          className="delete1"
          onClick={() => this.handleDelete(this.props.id.id)}
        >
          X
        </button>
        <textarea
          name="text"
          placeholder="Enter Text"
          value={this.state.text}
          onChange={this.handleChange}
          className="text"
          cols="33"
          rows="5"
          
        />
        <div className="buttons">
        <button
          className="save1"
          onClick={() =>
            this.handleSave(this.props.id.id, this.state.text)
          }
        >
          Save
        </button>
        </div>
      </div>
    );
  }
}

export default SingleNote;

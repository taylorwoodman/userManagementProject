import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./users.css";

class Users extends React.Component {
  constructor() {
    super();

    this.state = {
      allUsers: []
    };
  }

  componentDidMount() {
    axios
      .get("/allUsers")
      .then(response => {
        this.setState({ allUsers: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const users = this.state.allUsers.map((user) => {
      return (
        <div className="users" key={user.id}>
          <div className="cell"> {user.first_name} </div>
          <div className="cell"> {user.last_name} </div>
          <div className="email"> {user.email} </div>
          <div className="cell"> {user.username} </div>
          <div className="cell"></div>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="header">
          <div className="cell">First Name</div>
          <div className="cell">Last Name</div>
          <div className="email">Email</div>
          <div className="cell">Username</div>
          <Link to="/admin/updateUsers">
          <button className="edit">Edit</button>
          </Link>
        </div>  
        <div className="usersContainer">{users}</div>
      </div>
    );
  }
}

export default Users;

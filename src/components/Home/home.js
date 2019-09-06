import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Users from "../Users/users";
import "./home.css";

class Home extends React.Component {

  componentDidMount = () => {
    axios.get("/users").then(response => {
      this.props.updateUser(response.data);
    });
  };

  handleLogout() {
    axios.get("/logout");
  }


 
  render() {
    if (!this.props.user) return "user not found";
    return (
      <div className="parentHome">
        <div className="sideBar">
          <div className="welcome">
            Welcome home, {this.props.user.first_name}!
          </div>
          <div className="currentUser">User Info</div>
          <div className="homeInfo">
            Name:
            {" " + this.props.user.first_name + " " + this.props.user.last_name}
          </div>
          <div className="homeInfo">
            Username: {this.props.user.username}
          </div>
          <div className="homeInfo1">Email:</div> 
          <div className="homeInfo1">
            {this.props.user.email}
          </div>
          <Link to="/user/home">
            <button className="submit">Notes</button>
          </Link>
        

          <Link to="/login">
            <button className="submit" onClick={this.handleLogout}>Logout</button>
          </Link>
        </div>
        <Users />
      </div>
    );
  }
}

export default Home;

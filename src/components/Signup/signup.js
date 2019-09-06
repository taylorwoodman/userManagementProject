import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./signup.css";

class Signup extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: ""
    };
  }

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSignUp = async () => {
    try {
      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      };
      if (
        user.firstName &&
        user.lastName &&
        user.email &&
        user.password &&
        user.username
      ) {
        await
        axios.post("/signup", user);
        this.setState({ firstName: "", lastName: "", email: "", password: "", username: "" });
        alert("User created!")
        this.props.history.push("/login");
      } else {
        alert("User not created. Please fill out all fields and try again!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="parentSignup">
        <div className="signup">
          <input
            value={this.state.firstName}
            name="firstName"
            className="input1"
            placeholder="first name"
            type="text"
            onChange={this.handleInput}
          />
          <input
            value={this.state.lastName}
            name="lastName"
            className="input1"
            placeholder="last name"
            type="text"
            onChange={this.handleInput}
          />
          <input
            value={this.state.email}
            name="email"
            className="input1"
            placeholder="email"
            type="text"
            onChange={this.handleInput}
          />
          <input
            value={this.state.password}
            name="password"
            className="input1"
            placeholder="password"
            type="password"
            onChange={this.handleInput}
          />
          <input
            value={this.state.username}
            name="username"
            className="input1"
            placeholder="username"
            type="text"
            onChange={this.handleInput}
          />
          <div className="buttons">
            <Link to="/login">
            <button className="submit" onClick={this.handleSignUp}>
              Sign up!
            </button>
            </Link>
            <Link to="/login">
              <button className="submit">Return to login</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;

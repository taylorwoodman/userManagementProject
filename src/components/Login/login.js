import React from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "./login.css";

function Welcome() {
  return (
    <div className="title">
      <h1>Welcome!</h1>
      <p>Let's take some notes.</p>
    </div>
  );
}

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      password: "",
      username: ""
    };
  }

  handleLogin = async () => {
    try {
      const body = {
        password: this.state.password,
        username: this.state.username
      };

      if (body.username && body.password) {
        axios.post("/login", body).then(response => {
          this.props.updateUser(response.data);
          if (response.data.admin && response.data.owner === true) {
            this.props.history.push("/admin/home");
          } else {
            this.props.history.push("/user/home");
          }
        });
      } else {
        alert("Login incorrect");
        this.props.history.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleEnter = e => {
    if (e.which === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div className="parentLogin">
        <Welcome />
        <div className="login">
          <input
            className="input"
            placeholder="username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            onKeyPress={this.handleEnter}
          />
          <input
            className="input"
            placeholder="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            onKeyPress={this.handleEnter}
          />
          <button className="submit" onClick={this.handleLogin}>
            Sign In
          </button>
          <Link to="/signup">
            <button className="submit">Sign Up</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);

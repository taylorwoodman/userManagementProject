import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import Home from "./components/Home/home";
import UserHome from "./components/userHome/userHome";
import UpdateUsers from "./components/updateUsers/updateUsers";
import "./App.css";
import axios from "axios";

class AuthenticatedRoutes extends React.Component {
  constructor() {
    super();

    this.state = {
      admin: false
    };
  }

  async componentDidMount() {
    const { data: admin } = await axios.get("/isAdmin");
    
    if (!admin) {
      console.log(this.props.history)
      return this.props.history.goBack();
    }
    this.setState({ admin});

  }

  render() {
    if (!this.state.admin) return null;
    return (
      <div>
        <Route
          path="/admin/home"
          render={() => (
            <Home user={this.props.user} updateUser={this.props.updateUser} />
          )}
        />
        <Route
          path="/admin/updateUsers"
          render={() => (
            <UpdateUsers
              user={this.props.user}
              updateUser={this.props.updateUser}
            />
          )}
        />
      </div>
    );
  }
}
AuthenticatedRoutes = withRouter(AuthenticatedRoutes);

class AuthenticatedUserRoutes extends React.Component{
  constructor(){
    super();

    this.state  = {
      authenticated: false
    }
  }

  async componentDidMount() {
    const { data: authenticated } = await axios.get("/isAuth");
    if (!authenticated) {
      return this.props.history.push("/login");
    }
    return this.setState({ authenticated });
  }

  render(){
    if (!this.state.authenticated) return null;
    return(
      <Route
          path="/user/home"
          render={() => (
            <UserHome
              user={this.props.user}
              updateUser={this.props.updateUser}
            />
          )}
        />
    )
  }

}

AuthenticatedUserRoutes = withRouter(AuthenticatedUserRoutes)

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: ""
    };
  }

  updateUser = user => {
    this.setState({ user });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/signup"
              render={() => (
                <Signup user={this.state.user} updateUser={this.updateUser} />
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <Login user={this.state.user} updateUser={this.updateUser} />
              )}
            />
            <Route
              
              exact path="/"
              render={() => (
                <Login user={this.state.user} updateUser={this.updateUser} />
              )}
            />
            
            <Route
              path="/user"
              render={() => (
                <AuthenticatedUserRoutes
                  user={this.state.user}
                  updateUser={this.updateUser}
                />
              )}
            />
            <Route
              path="/admin"
              render={() => (
                <AuthenticatedRoutes
                  user={this.state.user}
                  updateUser={this.updateUser}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

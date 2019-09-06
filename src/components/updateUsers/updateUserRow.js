import React from "react";



class UpdateUserRow extends React.Component{
  constructor(props){
    super(props)
    
    this.state = {
      id: props.user.id,
      firstName: props.user.first_name,
      lastName: props.user.last_name,
      email: props.user.email,
      username: props.user.username,
      admin: props.user.admin
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });


  render(){
    return (
      <div className="users">
                <input className="cell1"
                 name="firstName"
                 onChange={(e) => this.handleChange(e)}
                 value={this.state.firstName}
                  />
                <input className="cell1" 
                name="lastName" 
                onChange={(e) => this.handleChange(e)} 
                value={this.state.lastName} 
                />
                <input className="email1" 
                name="email" 
                onChange={(e) => this.handleChange(e)} 
                value={this.state.email}
                />
                <input className="cell1" 
                name="username" 
                onChange={(e) => this.handleChange(e)} 
                value={this.state.username}
                />
                
               {!this.state.admin ? <button className="delete" onClick={() => this.props.handleDelete(this.state.id)}>Delete</button> : <div className="delete"></div>} 
                <button className="save" onClick={() => this.props.handleSubmit(this.state)}>Save</button>
              </div>
    )
  }
}

export default UpdateUserRow;
import React, { Component } from "react";

//for connecting frontend with backend to talk
import axios from "axios";

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    //to correctly use 'this' to refer to same class 'AddDrive'
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //initial state
    this.state = {
      username: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);

    axios.post("/users/add", user).then((res) => console.log(res.data));

    //redirect to same page
    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

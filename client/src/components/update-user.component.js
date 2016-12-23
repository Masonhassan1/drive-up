import React, { Component } from "react";
import axios from "axios";

export default class UpdateDrive extends Component {
  constructor(props) {
    super(props);

    //to correctly use 'this' to refer to same class 'AddDrive'
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //initial state
    this.state = {
      username: "",
      //users: [],
    };
  }

  //react lifecycle method
  componentDidMount() {
    axios
      .get("/users/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          username: res.data.username,
        });
      })
      .catch((err) => console.log(err));
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

    //save to DB
    axios
      .post("/users/update/" + this.props.match.params.id, user)
      .then((res) => console.log(res.data));

    //after submitting the drive, redirect to home page
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Update User here</h3>
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
              value="Update User here"
              className="btn btn-warning"
            />
          </div>
        </form>
      </div>
    );
  }
}

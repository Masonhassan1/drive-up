import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//functional component
const User = (props) => (
  <tr>
    <td>{props.user.username}</td>
    <td>
      <Link to={"/updateUser/" + props.user._id} className="btn btn-warning">
        Update
      </Link>{" "}
      <a
        className="btn btn-danger"
        href="#"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);
    this.state = { users: [] };
  }

  componentDidMount() {
    axios
      .get("/users")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => console.log(err));
  }

  deleteUser(id) {
    axios.delete("/users/delete/" + id).then((res) => console.log(res.data));
    this.setState({
      users: this.state.users.filter((e) => e._id !== id),
    });
  }

  usersList() {
    return this.state.users.map((currentuser) => {
      return (
        <User
          user={currentuser}
          deleteUser={this.deleteUser}
          key={currentuser._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Users List here</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.usersList()}</tbody>
        </table>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//functional component
const Drive = (props) => (
  <tr>
    <td>{props.drive.username}</td>
    <td>{props.drive.description}</td>
    <td>{props.drive.duration}</td>
    <td>{props.drive.date.substring(0, 10)}</td>
    <td>
      <Link to={"/update/" + props.drive._id} className="btn btn-warning">
        Update
      </Link>{" "}
      <a
        className="btn btn-danger"
        href="#"
        onClick={() => {
          props.deleteDrive(props.drive._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class DrivesList extends Component {
  constructor(props) {
    super(props);

    this.deleteDrive = this.deleteDrive.bind(this);

    this.state = { drives: [] };
  }

  componentDidMount() {
    axios
      .get("/drives")
      .then((res) => {
        this.setState({ drives: res.data });
      })
      .catch((err) => console.log(err));
  }

  deleteDrive(id) {
    axios.delete("/drives/delete/" + id).then((res) => console.log(res.data));
    this.setState({
      drives: this.state.drives.filter((e) => e._id !== id),
    });
  }

  drivesList() {
    return this.state.drives.map((currentdrive) => {
      return (
        <Drive
          drive={currentdrive}
          deleteDrive={this.deleteDrive}
          key={currentdrive._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Drives List here</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.drivesList()}</tbody>
        </table>
      </div>
    );
  }
}

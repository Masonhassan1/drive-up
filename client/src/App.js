import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import DrivesList from "./components/drives-list.component";
import UsersList from "./components/users-list.component";
import UpdateDrive from "./components/update-drive.component";
import AddDrive from "./components/add-drive.component";
import AddUser from "./components/add-user.component";
import UpdateUser from "./components/update-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={DrivesList} />
        <Route path="/users" exact component={UsersList} />
        <Route path="/update/:id" exact component={UpdateDrive} />
        <Route path="/updateUser/:id" exact component={UpdateUser} />
        <Route path="/addDrive" exact component={AddDrive} />
        <Route path="/addUser" exact component={AddUser} />
      </div>
    </Router>
  );
}

export default App;

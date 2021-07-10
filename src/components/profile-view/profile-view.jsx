import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

import "./profile-view.scss"

let email;
let birthdate;

export class ProfileView extends React.Component {
  componentDidMount() {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    axios.get(`https://myflix-57495.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}})
    .then((data) => {
      console.log(data);
      email = data.data.Email;
      birthdate = data.data.Birthday;
      })
    .catch((e) => {
      console.log(e);
    })
  }

  handleDelete (e) {
    e.preventDefault();
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    axios.delete(`https://myflix-57495.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}})
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert(`${user}'s account has been deleted!`);
        window.open('/', '_self');
      }).
      catch((e) => {
        console.log(e);
      })
  }

  handleUserUpdates(update) {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    let userInput = document.getElementById("username");
    let passwordInput = document.getElementById("new-password");
    let passwordCheckInput = document.getElementById("new-password-check");
    let emailInput = document.getElementById("new-email");
    let birthdayInput = document.getElementById("new-birthday");
    let newUsername;
    let newPassword;
    let newEmail = emailInput.value;
    let newBirthday = birthdayInput.value;
    if(userInput.value === "") {
      newUsername = user;
    }
    else if(userInput.value < 5) {
      console.log("Pleas use a username with at least 5 characters");
    }
    else {
      newUsername = userInput.value;
    }

    if (passwordInput.value !== passwordCheckInput.value) {
      console.log("The passwords need to match");
    }
    else if(passwordInput.value < 8) {
      console.log("Pleas use a password with at least 8 characters");
    }
    else {
      newPassword = passwordInput.value
    }

    axios.put(`https://myflix-57495.herokuapp.com/users/${user}`, {
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
      Birthday: newBirthday
    }, {headers: {Authorization: `Bearer ${token}`}})
    .then((data) => {
      console.log(data);
      alert("Your user info has been updates");
    })
    .catch((e) => {
      console.log(e);
    })
  }

  render() {
    const user = this.props.user;
    const setUser = this.props.setUser;
    console.log(email);
    console.log(birthdate);
    console.log("banana")
    return (
      <div>
        <div role="user info block" className="user-info">
          <h5>User Info</h5>
          <p>Username: {user}</p>
          <p>Email: {email}</p>
          <p>Birthdate: {birthdate}</p>
          <Button variant="secondary" onClick={this.handleDelete}>Delete Account</Button>
        </div>
        <h6>Update User Information</h6>
          <Form id="username-update-form">
            <Form.Group className="form-update">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" id="username"/>
            </Form.Group>
            <Form.Group className="form-update">
              <Form.Label>New or Current Password</Form.Label>
              <Form.Control type="password" id="new-password"/>
            </Form.Group>
            <Form.Group className="form-update">
              <Form.Label>Verify Password</Form.Label>
              <Form.Control type="password" id="new-password-check"/>
            </Form.Group>
            <Form.Group className="form-update">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" id="new-email"/>
            </Form.Group>
            <Form.Group  className="form-update">
              <Form.Label>Birthday</Form.Label>
             <Form.Control type="text" id="new-birthday"/>
            </Form.Group>
            <Button onClick={() => {this.handleUserUpdates;
            } }>Submit</Button>
          </Form>
      
      </div>
    );
  }
}

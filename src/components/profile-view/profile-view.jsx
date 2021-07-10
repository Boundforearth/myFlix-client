import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

import "./profile-view.scss"

export function ProfileView(props) {
  const [email, registeredEmail] = useState("");
  const [birthdate, registeredBirthdate] = useState("")

  const user = props.user;

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`https://myflix-57495.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}})
      .then((data) => {
      registeredEmail(data.data.Email);
      registeredBirthdate(data.data.Birthday);
      })
      .catch((e) => {
      console.log(e);
      }), []
    }
  )

  const handleDelete = (e) => {
    e.preventDefault();
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

  const handleUserUpdates = () => {
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
      newUsername = user
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
      alert("Your user info has been updates");
      localStorage.removeItem("user");
      localStorage.setItem("user", newUsername);
      let newUser = localStorage.getItem("user");
      props.setUser(newUser);
    })
    .catch((e) => {
      console.log(e);
    })
  }

  return (
    <div>
    <div role="user info block" className="user-info">
      <h5>User Info</h5>
      <p>Username: {user}</p>
      <p>Email: {email}</p>
      <p>Birthdate: {birthdate}</p>
      <Button variant="secondary" onClick={handleDelete}>Delete Account</Button>
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
        <Button variant="secondary" onClick={handleUserUpdates}>Submit</Button>
      </Form>
  
  </div>
)
}


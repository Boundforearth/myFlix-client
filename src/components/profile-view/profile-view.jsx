import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

import "./registration-view.scss"

export class ProfileView extends React.Component {


  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://myflix-57495.herokuapp.com/user", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self');
      //'_self' prevents the page from opening in a new tab
    })
    .catch ((error) => {
      console.log("error registering the user")
    });
  }

  render() {
    return (
      <div>
        <h3>User Info</h3>
        <p>Username: {}</p>
        <p>Email:</p>
        <p>Birthdate</p>

        <h3>Update Username</h3>
          <Form id="username-update-form">
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
          </Form>
        <h3>Update Password</h3>
        <Form id="password-update-form">
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Verify Password</Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
          </Form>

        <h3>Update Email</h3>
          <Form id="email-update-form">
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
          </Form>
      
      </div>
    );
  }
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired
}
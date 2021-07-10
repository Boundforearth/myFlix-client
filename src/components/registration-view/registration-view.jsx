import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./registration-view.scss"

export function RegistrationView(props) {
  const [username, registerUsername] = useState("");
  const [password, registerPassword] = useState("");
  const [email, registerEmail] = useState("");
  const [birthday, registerBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://myflix-57495.herokuapp.com/users", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self');
      alert("You have regiseterd!  Please login.")
      //'_self' prevents the page from opening in a new tab
    })
    .catch ((error) => {
      console.log("error registering the user")
    });
  }

  return (
    <Form id="registration-form-styling">
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => registerUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => registerPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => registerEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBirthdayMonthDayYear">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" value={birthday} onChange={(e) => registerBirthday(e.target.value)} />
      </Form.Group>
      <div className="button-group">
        <Button variant="secondary" onClick={handleSubmit}>Register</Button> 
        <Link to="/"><Button variant="secondary">Already Registered</Button></Link> 
      </div>
    </Form>
  );
}
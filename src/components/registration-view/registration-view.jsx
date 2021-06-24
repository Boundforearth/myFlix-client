import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

import "./registration-view.scss"

export function RegistrationView(props) {
  const [username, registerUsername] = useState("");
  const [password, registerPassword] = useState("");
  const [email, registerEmail] = useState("");
  const [birthday, registerBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegistration();
  }

  return (
    <Form>
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
      <Button variant="secondary" onClick={handleSubmit}>Register</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired
}
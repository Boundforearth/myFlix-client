import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

export function LoginView(props) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    //Send a request to the server for authentication
    //then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  const needToRegister = (e) => {
    e.preventDefault();
    props.notRegistered();
  }

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username..."/>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
      </Form.Group>
      <Button variant="secondary" type="button" onClick={handleSubmit}>Sign in</Button>
      <Button variant="secondary" type="button" onClick={needToRegister}>Register</Button>
    </Form>
  );
};

LoginView.propTypes = {
  notRegistered: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired
}
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./login-view.scss"

export function LoginView(props) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Send a request to the server for authentication
    axios.post("https://myflix-57495.herokuapp.com/login", {
      Username: username,
      Password: password
    })
    .then((response) => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch ((e) => {
      console.error(e);
      alert("Can not find that Username and Password");
    })
  };

  return (
    <Form id="form-styling">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username..."/>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
      </Form.Group>
      <div className="button-group">
        <Button variant="secondary" type="button" onClick={handleSubmit}>Sign in</Button>
        <Link to="/register">
          <Button variant="secondary" type="button">Register</Button>
        </Link>
      </div>
    </Form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./registration-view.scss"

export function RegistrationView(props) {
  //state for form, which will be an object with username, password, birthday, email, and password verification keys
  const [form, setForm] = useState({});

  //state for errors, which will be an object containing error messages
  const [errors, setErrors] = useState({});

  //sets the state of form, resets the state of errors
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })

    if( !!errors[field] ) {
      setErrors({
        ...errors,
        [field]: null
      })
    }
  }

  //function to validate all the form inputs
  const errorHandling = () => {
    const { username, password, passwordVerification, email} = form;
    const newErrors = {};
    if( !username || username === "" || username.length < 5) {
      newErrors.username = "Please enter a Username with at least 5 characters";
    }
    if (password.length < 8 || !password) {
      newErrors.password = "Please enter a password of at least 8 characters";
    }
    else if(password !== passwordVerification) {
      newErrors.password = "Your passwords don't match";
    }
    if(email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      newErrors.email = "Please enter a valid email"
    }
    return newErrors
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    //set the errors
    const newErrors = errorHandling();
    //if there are errors, the if part will return them and the post reqyest will not run
    if ( Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      console.log(newErrors);
    }

    else {
      //if no errors were found, this code runs
      axios.post("https://myflix-57495.herokuapp.com/users", {
        Username: form.username,
        Password: form.password,
        Email: form.email,
        Birthday: form.birthday
      })
      .then(response => {
        const data = response.data;
        window.open('/', '_self');
        alert("You have regiseterd!  Please login.")
        //'_self' prevents the page from opening in a new tab
      })
      .catch ((error) => {
        alert("Error registering the user. Please try a different username")
        console.log(error)
      });
    }
  }

  return (
    <Form id="registration-form-styling">
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control 
            type="text" 
            onChange={(e) => setField("username", e.target.value)} 
            isInvalid={!!errors.username}
        />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
            type="password" 
            onChange={(e) => setField("password", e.target.value)} 
            isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPasswordVerification">
        <Form.Label>Re-enter Password</Form.Label>
        <Form.Control type="password" onChange={(e) => setField("passwordVerification", e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
            type="email" 
            onChange={(e) => setField("email", e.target.value)} 
            isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBirthdayMonthDayYear">
        <Form.Label>Birthday</Form.Label>
        <Form.Control 
            type="date" 
            onChange={(e) => setField("birthday", e.target.value)} 
        />
      </Form.Group>
      <div className="button-group">
        <Button variant="secondary" onClick={handleSubmit}>Register</Button> 
        <Link to="/"><Button variant="secondary">Already Registered</Button></Link> 
      </div>
    </Form>
  );
}
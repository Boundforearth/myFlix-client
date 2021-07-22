import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./registration-view.scss"

export function RegistrationView() {
  //state for form, which will be an object with username, password, birthday, email, and password verification keys
  const [form, setForm] = useState({});

  //state for errors, which will be an object containing error messages
  const [errors, setErrors] = useState({});

  //sets the state of form, resets the state of errors
  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

    if( !!errors[e.target.name] ) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      })
    }
  }

  //function to validate all the form inputs
  const errorHandling = () => {
    const { Username, Password, PasswordVerification, Email} = form;
    const newErrors = {};
    if( !Username || Username === "" || Username.length < 5) {
      newErrors.Username = "Please enter a Username with at least 5 characters";
    }
    if (Password.length < 8 || !Password) {
      newErrors.Password = "Please enter a password of at least 8 characters";
    }
    else if(Password !== PasswordVerification) {
      newErrors.Password = "Your passwords don't match";
    }
    if(Email.indexOf("@") === -1 || Email.indexOf(".") === -1) {
      newErrors.Email = "Please enter a valid email"
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
        Username: form.Username,
        Password: form.Password,
        Email: form.Email,
        Birthday: form.Birthday
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
          name="Username"
          value={form.Username ? form.Username : ""} 
          type="text" 
          onChange={change} 
          isInvalid={!!errors.Username}
        />
          <Form.Control.Feedback type="invalid">
            {errors.Username}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          name="Password"
          value={form.Password ? form.Password : ""}
          type="password" 
          onChange={change} 
          isInvalid={!!errors.Password}
        />
        <Form.Control.Feedback type="invalid">
            {errors.Password}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPasswordVerification">
        <Form.Label>Re-enter Password</Form.Label>
        <Form.Control 
          name="PasswordVerification"
          value={form.PasswordVerification ? form.PasswordVerification : ""}
          type="password" 
          onChange={change} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          name="Email"
          value={form.Email ? form.Email : ""}
          type="email" 
          onChange={change} 
          isInvalid={!!errors.Email}
        />
        <Form.Control.Feedback type="invalid">
            {errors.Email}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBirthdayMonthDayYear">
        <Form.Label>Birthday</Form.Label>
        <Form.Control 
          name="Birthday"
          type="date" 
          onChange={change} 
          value={
            form.Birthday ? form.Birthday.slice(0, 10) : ""
          }
        />
      </Form.Group>
      <div className="button-group">
        <Button variant="secondary" onClick={handleSubmit}>Register</Button> 
        <Link to="/"><Button variant="secondary">Already Registered</Button></Link> 
      </div>
    </Form>
  );
}
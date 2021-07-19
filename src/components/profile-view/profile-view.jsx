import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { setUser } from "../../actions/actions";

import "./profile-view.scss"

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

export function ProfileView(props) {
  //these will be used to display the users information on their profile.
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("")

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const { user } = props;

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`https://myflix-57495.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}})
      .then((data) => {
      setEmail(data.data.Email);
      setBirthdate(data.data.Birthday);
      })
      .catch((e) => {
      console.log(e);
      })}, []
  )

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

  const errorHandling = () => {
    const { username, password, passwordVerification, email} = form;
    const newErrors = {};
    if( !username || username === "" || username.length < 5) {
      newErrors.username = "Please enter a Username with at least 5 characters";
    }
    if (!password || password.length < 8) {
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


  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`https://myflix-57495.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}})
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        props.setUser('');
        alert(`${user}'s account has been deleted!`);
        window.open('/', '_self');
      }).
      catch((e) => {
        console.log(e);
      })
  }
  const handleUserUpdates = (e) => {
    e.preventDefault();
    const newErrors = errorHandling();
    if ( Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      console.log(newErrors);
    }
    else{ 
        axios.put(`https://myflix-57495.herokuapp.com/users/${user}`, {
        Username: form.username,
        Password: form.password,
        Email: form.email,
        Birthday: form.birthday
      }, {headers: {Authorization: `Bearer ${token}`}})
      .then((data) => {
        alert("Your user info has been updates");
        //change the user stored in local storage
        localStorage.removeItem("user");
        localStorage.setItem("user", form.username);
        //change the state of the username
        props.setUser(form.username);
        //redirect the user to their new profile page
        window.open(`${form.username}`, '_self')
      })
      .catch((e) => {
        console.log(e);
      })
    }
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
        <Form.Group controlId="newUsername" className="form-update">
          <Form.Label>Username</Form.Label>
          <Form.Control 
              type="text" 
              onChange={(e) => setField("username", e.target.value)} 
              isInvalid={!!errors.username}/>
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>



        <Form.Group controlId="newPassword" className="form-update">
          <Form.Label>New or Current Password</Form.Label>
          <Form.Control 
              type="password" 
              onChange={(e) => setField("password", e.target.value)}
              isInvalid={!!errors.password}/>
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="newPasswordVerify" className="form-update">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control 
              type="password" 
              onChange={(e) => setField("passwordVerification", e.target.value)}/>
        </Form.Group>


        <Form.Group controlId="newEmail" className="form-update">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            onChange={(e) => setField("email", e.target.value)}
            isInvalid={!!errors.email}/>
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group  controlId="newBirthday" className="form-update">
          <Form.Label>Birthday</Form.Label>
         <Form.Control 
            type="Date" 
            onChange={(e) => setField("birthday", e.target.value)}/>
        </Form.Group>
        <Button variant="secondary" onClick={handleUserUpdates}>Submit</Button>
      </Form>
  
  </div>
)
}


export default connect(mapStateToProps, { setUser } )(ProfileView);

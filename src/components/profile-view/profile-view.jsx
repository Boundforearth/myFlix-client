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

function ProfileView({user, setUser}) {
  //these will be used to display the users information on their profile.
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("")

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://myflix-57495.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then((data) => {
        setEmail(data.data.Email);
        setBirthdate(data.data.Birthday.slice(0, 10));
      })
      .catch((e) => {
        console.log(e);
      })}, []
  )

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

    if( !!errors[e.target.name] ) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  }

  const errorHandling = () => {
    const { Username, Password, PasswordVerification, Email} = form;
    const newErrors = {};
    if( !Username || Username === "" || Username.length < 5) {
      newErrors.Username = "Please enter a Username with at least 5 characters";
    }
    if (!Password || Password.length < 8) {
      newErrors.Password = "Please enter a password of at least 8 characters";
    }
    else if(Password !== PasswordVerification) {
      newErrors.Password = "Your passwords don't match";
    }
    if(Email.indexOf("@") === -1 || Email.indexOf(".") === -1) {
      newErrors.Email = "Please enter a valid email"
    }
    return newErrors;
  };


  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`https://myflix-57495.herokuapp.com/users/${user}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert(`${user}'s account has been deleted!`);
        setUser('');
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
        axios
          .put(
            `https://myflix-57495.herokuapp.com/users/${user}`, 
            {
              Username: form.Username,
              Password: form.Password,
              Email: form.Email,
              Birthday: form.Birthday
            }, 
            {headers: {Authorization: `Bearer ${token}` } }
          )
        .then(() => {
          alert("Your user info has been updates");
          //change the user stored in local storage
          localStorage.removeItem("user");
          localStorage.setItem("user", form.Username);
          //change the state of the username
          setUser(form.Username);
          //redirect the user to their new profile page
          window.open(`${form.Username}`, '_self')
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      <div role="user info block" className="user-info">
        <h5>User Info</h5>
        <p>Username: {user}</p>
        <p>Email: {email}</p>
        <p>Birthdate: {birthdate}</p>
        <Button variant="secondary" onClick={handleDelete}>
          Delete Account
        </Button>
      </div>
      <h6>Update User Information</h6>
        <Form id="username-update-form">
          <Form.Group controlId="newUsername" className="form-update">
            <Form.Label>Username</Form.Label>
            <Form.Control 
                type="text"
                name="Username"
                value={form.Username ? form.Username : ""} 
                onChange={change} 
                isInvalid={!!errors.Username}
              />
            <Form.Control.Feedback type="invalid">
              {errors.Username}
            </Form.Control.Feedback>
          </Form.Group>



          <Form.Group controlId="newPassword" className="form-update">
            <Form.Label>New or Current Password</Form.Label>
            <Form.Control
              name="Password" 
              type="password"
              value={form.Password ? form.Password : ""} 
              onChange={change}
              isInvalid={!!errors.Password}/>
            <Form.Control.Feedback type="invalid">
              {errors.Password}
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="newPasswordVerify" className="form-update">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control 
              name="PasswordVerification"
              type="password" 
              onChange={change}/>
          </Form.Group>


          <Form.Group controlId="newEmail" className="form-update">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              name="Email"
              type="email" 
              onChange={change}
              isInvalid={!!errors.Email}/>
            <Form.Control.Feedback type="invalid">
              {errors.Email}
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group  controlId="newBirthday" className="form-update">
            <Form.Label>Birthday</Form.Label>
          <Form.Control 
            name="Birthday"
            type="date" 
            value={
              form.Birthday ? form.Birthday.slice(0, 10) : ""
            }
            onChange={change}/>
          </Form.Group>
          <Button variant="secondary" onClick={handleUserUpdates}>Submit</Button>
        </Form>
    
  </div>
)
}

ProfileView.propTypes = {
  user: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setUser } )(ProfileView);

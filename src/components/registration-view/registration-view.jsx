import React, { useState } from "react";
import PropTypes from "prop-types";

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
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => registerUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => registerPassword(e.target.value)} />
      </label>
      <label>
        email:
        <input type="email" value={email} onChange={(e) => registerEmail(e.target.value)} />
      </label>
      <label>
        birthday:
        <input type="date" value={birthday} onChange={(e) => registerBirthday(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired
}
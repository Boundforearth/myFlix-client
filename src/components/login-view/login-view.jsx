import React, { useState } from "react";
import PropTypes from "prop-types";

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
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <span>
        <button type="button" onClick={handleSubmit}>Submit</button>
        <button type="button" onClick={needToRegister}>Register</button>
      </span>
    </form>
  );
};

LoginView.propTypes = {
  notRegistered: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired
}
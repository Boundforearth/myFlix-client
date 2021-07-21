import React from "react";
import PropTypes from "prop-types";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { setView } from "../../actions/actions"

//images must be imported with the url:  part before them to work with parcel.
//These images will be displayed to give users a visual hint about what the view will change to.
import Vertical from "url:./nav-view-images/Vertical-view.png";
import Horizontal from "url:./nav-view-images/Horizontal-view.png";

import "./nav-view.scss"

const mapStateToProps = state => {
  const { user, selectedView } = state;
  return { user, selectedView };
};

function NavView({user, selectedView, setView, onLogout}) {

  //These variables will be used to set a className
  let verticalButton;
  let horizontalButton;
  let navigationDisplay;


  //Both variables must be defined to prevent an empty class.  none is basically just a placeholder
  if (selectedView === "2") {
    horizontalButton = "horizontal";
    verticalButton = "none";
  }

  else{
    verticalButton = "vertical";
    horizontalButton = "none";
  }

  if(!user) {
    navigationDisplay = "no-nav-bar-block";
  }
  else {
    navigationDisplay = "nav-bar-block"
  }

  const handleChange = (e) => {
    let view = e.target.dataset.value;
    setView(view);
  }
  return (
    <Navbar bg="light" fixed="top" expand="md" id={navigationDisplay}>
      <Navbar.Brand><Link className="link-styling" to="/">myFlix</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title={user} id="basic-nav-dropdown">
            <NavDropdown.Item as="button"><Link className="link-styling" to={`/users/${user}`}>MyProfile</Link></NavDropdown.Item>
            <NavDropdown.Item as="button"><Link className="link-styling" to={`/myfavorites/${user}`}>Favorites</Link></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as="button" onClick={() => {onLogout()}}>Log-out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <div>
          <span>Select View:  </span>
          <button className={`view-button ${verticalButton}`} ><img alt="View selection image" className="view-choice" alternate="Change to vertical view" onClick={handleChange} data-value="1" src={Vertical}/></button>
          <button className={`view-button ${horizontalButton}`}><img alt="View selection image" className="view-choice" alternate="Change to horizontal view" onClick={handleChange} data-value="2" src={Horizontal}/></button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

NavView.propTypes = {
  setView: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  selectedView: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {setView})(NavView);

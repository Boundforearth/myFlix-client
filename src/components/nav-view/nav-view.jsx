import React from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import Vertical from "url:./nav-view-images/Vertical-view.png";
import Horizontal from "url:./nav-view-images/Horizontal-view.png";

import "./nav-view.scss"

export function NavView(props) {
  const user = props.username
  const changeView = props.changeView

  const handleChange = (e) => {
    let view = e.target.dataset.value;
    changeView(view);
  }
  return (
    <Navbar bg="light" fixed="top" expand="md">
      <Navbar.Brand>myFlix</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title={user} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action1">MyProfile</NavDropdown.Item>
            <NavDropdown.Item href="#action2">Favorites</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action3">Log-out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search..." className="mr-sm-2" />
          <Button type="submit" variant="secondary">Submit</Button>
        </Form>
        <div id="view-select-block">
          <img className="view-choice" alternate="Change to vertical view" onClick={handleChange} data-value="1" src={Vertical}/>
          <img className="view-choice" alternate="Change to horizontal view" onClick={handleChange} data-value="2" src={Horizontal}/>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

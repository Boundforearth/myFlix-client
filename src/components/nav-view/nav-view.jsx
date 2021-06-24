import React from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";

export function NavView(props) {
  const user = props.username
  const changeView = props.changeView

  const handleChange = (e) => {
    let view = e.target.value;
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
        <Form inline>
          <Form.Check inline onClick={handleChange} label="1" name="group1" value="1" type="radio" id="inline-radio-1"/>
          <Form.Check inline onClick={handleChange} label="2" name="group1" value="2"type="radio" id="inline-radio-2"/>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

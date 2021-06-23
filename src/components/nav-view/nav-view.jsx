import React from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";

export function NavView(props) {
  const user = props.username
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
      </Navbar.Collapse>
    </Navbar>
  )
}

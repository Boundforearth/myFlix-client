import React from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";

//images must be imported with the url:  part before them to work with parcel.
//These images will be displayed to give users a visual hint about what the view will change to.
import Vertical from "url:./nav-view-images/Vertical-view.png";
import Horizontal from "url:./nav-view-images/Horizontal-view.png";

import "./nav-view.scss"

export function NavView(props) {
  //set the imported props to variables
  const user = props.username;
  const changeView = props.changeView;
  const view = props.selectedView;

  //These variables will be used to set a className
  let verticalButton
  let horizontalButton


  //Both variables must be defined to prevent an empty class.  none is basically just a placeholder
  if (view === "2") {
    horizontalButton = "horizontal";
    verticalButton = "none";
  }

  else{
    verticalButton = "vertical";
    horizontalButton = "none";
  }

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
          <button className={`view-button ${verticalButton}`} ><img alt="View selection image" className="view-choice" alternate="Change to vertical view" onClick={handleChange} data-value="1" src={Vertical}/></button>
          <button className={`view-button ${horizontalButton}`}><img alt="View selection image" className="view-choice" alternate="Change to horizontal view" onClick={handleChange} data-value="2" src={Horizontal}/></button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

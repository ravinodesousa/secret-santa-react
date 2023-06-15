import React from "react";
import { Container, Navbar, Image, Nav } from "react-bootstrap";
import Logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <Image src={Logo} fluid />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to={"/"}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/employees"}>
              <Nav.Link>Employees</Nav.Link>
            </LinkContainer>

            {/* <Link to={"/"} title="Home" /> */}
            {/* <Link to={"/employees"} title="Employees" /> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

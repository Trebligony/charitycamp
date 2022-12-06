import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab, Button } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar  bg="light" variant="light" expand="lg"  sticky="top" >
        <Container fluid >
          <Navbar.Brand className="mt-2" as={Link} to="/">
            <img src="/assets/logo192.png" width="100" height="100" alt="Charity Camp - Donate To Non-Profits!"></img>
          </Navbar.Brand>
          <Navbar.Brand className="mt-2" as={Link} to="/">
            <h4>Charity Camp - Donate To Non-Profits!</h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              
              <Nav.Link as={Link} to="/"><Button variant="outline-secondary">Search for n-Profits</Button></Nav.Link>
              <Nav.Link as={Link} to="/recommend"><Button variant="outline-secondary">Top-10 Recommended n-Profits</Button></Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/saved">
                  <Button variant="outline-secondary">Saved n-Profits</Button>
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}> <Button variant="success">Logout</Button></Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  <Button variant="success"> Login/Sign Up</Button>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Sign-in</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Register</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;

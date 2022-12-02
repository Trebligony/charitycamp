import React, { useSate } from 'react';
import { Link } from "react-router-dom";
import { NavBar, Nav, Container, Model, Tab, Button } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";

const AppNavbar = () => {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
          <Navbar fluid bg="light" variant="light" expand="lg"  sticky="top" >
            <Container >
              <Navbar.Brand className="mt-2" as={Link} to="/">
                <h2>Non-Profit Crowdfunding</h2>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbar" />
              <Navbar.Collapse id="navbar">
                <Nav className="ml-auto">
                  <Nav.Link as={Link} to="/"><Button variant="outline-secondary">Search for Non-Profits</Button>
                  </Nav.Link>
                  {/* if user is logged in show saved books and logout */}
                  {Auth.loggedIn() ? (
                    <>
                      <Nav.Link as={Link} to="/saved">
                      <Button variant="outline-secondary">Saved Non-Profits</Button>
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
}

export default AppNavbar;
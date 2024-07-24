import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SignIn from './SignIn.jsx';
import Registration from './Registration.jsx';


export default function Header({
    modalRegistration,
}) {
    
    const [modalShow, setModalShow] = useState(false);
    const [showModalReg, setShowModalReg] = useState(false);

    const signInRef = useRef(null);
    const registrationRef = useRef(null);

    const handleCreateAccountClick = () => {
        setModalShow(false);
        setShowModalReg(true);
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
                <Container>
                    <Navbar.Brand as={Link} to="/"><h1 className="mb-0 text-primary text-uppercase"><i className="fa fa-cut me-3"></i>HairCut</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="about">About</Nav.Link>
                            <Nav.Link as={Link} to="services">Services</Nav.Link>
                            <Nav.Link as={Link} to="contact">Contact</Nav.Link>
                        </Nav>
                        <Nav>
                            {/* <Nav.Link as={Link} to="#" onClick={() => setModalShow(true)}>Login</Nav.Link> */}
                            <Nav.Link as={Link} to="calendar" >Login</Nav.Link>
                            <Nav.Link as={Link} to="bookings" >My Bookings</Nav.Link>
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                                Appointment <i className="fa fa-arrow-right ms-3"></i>
                            </Button>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <SignIn
                ref={signInRef}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onCreateAccountClick={handleCreateAccountClick}
            />
            <Registration 
                ref={registrationRef}
                show={showModalReg}
                onHide={() => setShowModalReg(false)} 
            />
        </>
    );
}

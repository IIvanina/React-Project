import { Link } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SignIn from './SignIn.jsx';
import Registration from './Registration.jsx';
import AuthContext from '../contexts/authContext.jsx';
import Path from "../path.js";

export default function Header() {
    const [modalShow, setModalShow] = useState(false);
    const [showModalReg, setShowModalReg] = useState(false);

    const signInRef = useRef(null);
    const registrationRef = useRef(null);

    const { loginSubmitHandler, isAuthenticated, username, userId } = useContext(AuthContext);

    const handleCreateAccountClick = () => {
        setModalShow(false);
        setShowModalReg(true);
    };

    const handleLoginSubmit = async (values) => {
        await loginSubmitHandler(values, () => setModalShow(false));
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
                <Container>
                    <Navbar.Brand as={Link} to="/"><h1 className="mb-0 text-primary text-uppercase"><i className="fa fa-cut me-3"></i>HairCut</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={Path.Home}>Home</Nav.Link>
                            <Nav.Link as={Link} to={Path.Services}>Services</Nav.Link>
                        </Nav>
                        <Nav>
                            {isAuthenticated ? (
                                <>  <span className='username'>{username}</span>
                                    <Nav.Link as={Link} to={`/calendar/${username}`}>Calendar</Nav.Link>
                                    <Nav.Link as={Link} to={`/bookings/${username}`}>My Bookings</Nav.Link>
                                    <Nav.Link as={Link} to={Path.Logout} >Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to={Path.Login} onClick={() => setModalShow(true)}>Login</Nav.Link>
                                    <Button variant="primary" onClick={() => setModalShow(true)}>
                                        Appointment <i className="fa fa-arrow-right ms-3"></i>
                                    </Button>
                                </>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <SignIn
                ref={signInRef}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onCreateAccountClick={handleCreateAccountClick}
                loginSubmitHandler={handleLoginSubmit}
            />
            <Registration
                ref={registrationRef}
                show={showModalReg}
                onHide={() => setShowModalReg(false)}
            />
        </>
    );
}

import React, { forwardRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../components/Modal.module.css';

const SignIn = forwardRef((props, ref) => {
    const { show, onHide, onCreateAccountClick } = props;

    return (
        <Modal
            ref={ref}
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
        >
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div>
                    <p>OR</p>
                    <p>
                        <Link 
                            to="#" 
                            onClick={onCreateAccountClick}
                        > 
                            Create an account
                        </Link>
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
});

export default SignIn;

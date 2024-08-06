import React, { forwardRef, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

import styles from '../components/Modal.module.css';
import AuthContext from '../contexts/authContext.js';
import useForm from '../hooks/useForm.js';

const RegisterFormKeys = {
    Name: 'name',
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password'

}

const Registration = forwardRef((props, ref) => {
    const { show, onHide } = props;
    const { registerSubmitHandler } = useContext(AuthContext);

    const [validated, setValidated] = useState(false);

    const closeModal = () => {
        onHide();
    };

    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Name]: '',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        
    }, closeModal);

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
                    Register
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Form noValidate validated={validated} onSubmit={onSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="name"
                                placeholder="Name"
                                name="name"
                                onChange={onChange}
                                value={values[RegisterFormKeys.Name]}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                id="email"
                                placeholder="Email"
                                name="email"
                                onChange={onChange}
                                value={values[RegisterFormKeys.Email]}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                placeholder="Password"
                                name="password"
                                onChange={onChange}
                                value={values[RegisterFormKeys.Password]}
                                required
                            />
                        </Form.Group>
                        
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                        />
                    </Form.Group>
                    <Button type="submit">Submit form</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default Registration;


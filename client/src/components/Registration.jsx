import React, { forwardRef, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

import styles from '../components/Modal.module.css';
import AuthContext from '../contexts/authContext.jsx';
import useForm from '../hooks/useForm.js';

const RegisterFormKeys = {
    Name: 'name',
    Email: 'email',
    Password: 'password',
}

const Registration = forwardRef((props, ref) => {
    const { show, onHide } = props;
    const { registerSubmitHandler, errorMessage } = useContext(AuthContext);

    const [validated, setValidated] = useState(false);

    const closeModal = () => {
        onHide();
    };

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Name is required';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const { values, errors, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Name]: '',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
    }, validate, closeModal);

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
                    {errorMessage && (
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    )}
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id={RegisterFormKeys.Name}
                                placeholder="Name"
                                name={RegisterFormKeys.Name}
                                onChange={onChange}
                                value={values[RegisterFormKeys.Name]}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                id={RegisterFormKeys.Email}
                                placeholder="Email"
                                name={RegisterFormKeys.Email}
                                onChange={onChange}
                                value={values[RegisterFormKeys.Email]}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                id={RegisterFormKeys.Password}
                                placeholder="Password"
                                name={RegisterFormKeys.Password}
                                onChange={onChange}
                                value={values[RegisterFormKeys.Password]}
                                isInvalid={!!errors.password}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Submit form</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default Registration;

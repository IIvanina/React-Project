import React, { forwardRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Alert } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import styles from '../components/Modal.module.css';
import useForm from '../hooks/useForm.js';
import AuthContext from '../contexts/authContext.jsx';
import validateLoginForm from '../utils/validation.js';
import Path from '../path.js';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password',
};

const SignIn = forwardRef((props, ref) => {
    const { show, onHide, onCreateAccountClick } = props;
    const { loginSubmitHandler } = useContext(AuthContext);

    const { values, errors, isSubmitting, serverError, onChange, onSubmit } = useForm(
        async (values) => {
            await loginSubmitHandler(values, onHide);
        },
        {
            [LoginFormKeys.Email]: '',
            [LoginFormKeys.Password]: '',
        },
        validateLoginForm 
    );

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
                <Form onSubmit={onSubmit}>
                    {serverError && (
                        <Alert variant="danger">
                            {serverError}
                        </Alert>
                    )}
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email"
                            name={LoginFormKeys.Email}
                            onChange={onChange}
                            value={values[LoginFormKeys.Email]}
                            isInvalid={!!errors.email}
                        />
                        {errors.email && (
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            name={LoginFormKeys.Password}
                            onChange={onChange}
                            value={values[LoginFormKeys.Password]}
                            isInvalid={!!errors.password}
                        />
                        {errors.password && (
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </Form>
                <div>
                    <p className='mt-5'>OR</p>
                    <p>
                        <Link 
                            to={Path.Register} 
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

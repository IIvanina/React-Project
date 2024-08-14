import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/authContext.jsx';
import SignIn from '../components/SignIn.jsx';

describe('SignIn component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SignIn show={true} onHide={() => {}} onCreateAccountClick={() => {}} />
                </AuthProvider>
            </BrowserRouter>
        );
    });

    it('renders login form correctly', () => {
        
        expect(screen.getByText("Login")).toBeInTheDocument();

        
        const emailInput = screen.getByLabelText('Email address');
        const passwordInput = screen.getByLabelText('Password');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

        
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('testPassword');

        
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);

        
    });

    it('shows validation error message when password is empty', async () => {
        
        const emailInput = screen.getByLabelText('Email address');
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: '' } });

        
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        
        await waitFor(() => {
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });

    it('shows validation error message when email is empty', async () => {
        
        const emailInput = screen.getByLabelText('Email address');
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '123' } });

        
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        
        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });
});



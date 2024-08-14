import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/authContext.jsx';
import Registration from '../components/Registration.jsx';

describe('Registration component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Registration show={true} onHide={() => {}} />
                </AuthProvider>
            </BrowserRouter>
        );
    });

    it('renders registration form correctly', () => {
        expect(screen.getByText("Register")).toBeInTheDocument();
    
        const nameInput = screen.getByPlaceholderText('Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
    
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    
        expect(nameInput.value).toBe('John Doe');
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('testPassword');
    
        const submitButton = screen.getByRole('button', { name: /submit form/i });
        fireEvent.click(submitButton);
    });
    

    it('shows validation error message when name is empty', async () => {
        
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

        fireEvent.click(screen.getByRole('button', { name: /submit form/i }));

        await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
        });
    });

    it('shows validation error message when email is empty', async () => {
        const nameInput = screen.getByPlaceholderText('Name');
        
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

        fireEvent.click(screen.getByRole('button', { name: /submit form/i }));

        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });

    it('shows validation error message when password is empty', async () => {
        const nameInput = screen.getByPlaceholderText('Name');
        const emailInput = screen.getByPlaceholderText('Email');
        

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        fireEvent.click(screen.getByRole('button', { name: /submit form/i }));

        await waitFor(() => {
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });

    it('does not show validation errors when all fields are filled', async () => {
        const nameInput = screen.getByPlaceholderText('Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

        fireEvent.click(screen.getByRole('button', { name: /submit form/i }));

        await waitFor(() => {
            expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
            expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
            expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
        });
    });
});

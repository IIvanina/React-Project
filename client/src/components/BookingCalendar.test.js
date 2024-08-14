import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookingCalendar from '../components/BookingCalendar';
import * as bookingService from '../services/bookingService';

jest.mock('../services/bookingService');

const mockBookings = [
    { date: '2023-08-15', time: '09:00 AM' },
    { date: '2023-08-15', time: '10:00 AM' },
];

describe('BookingCalendar component', () => {
    beforeEach(() => {
        bookingService.getBookingsForDate.mockResolvedValue(mockBookings);
        bookingService.create.mockResolvedValue({});
    });

    it('renders correctly', async () => {
        render(
            <BrowserRouter>
                <BookingCalendar />
            </BrowserRouter>
        );

        // Check that the services are rendered
        expect(screen.getByText('Select Services:')).toBeInTheDocument();
        expect(screen.getByText('Haircut - $20')).toBeInTheDocument();

        // Wait for the text "Available Slots on" to appear
        await waitFor(() => {
            // Using regular expression to handle possible variations in text
            expect(screen.getByText(/Available Slots on/i)).toBeInTheDocument();
        });
    });

    it('handles service selection correctly', () => {
        render(
            <BrowserRouter>
                <BookingCalendar />
            </BrowserRouter>
        );

        const haircutCheckbox = screen.getByLabelText('Haircut - $20');
        expect(haircutCheckbox.checked).toBe(false);

        fireEvent.click(haircutCheckbox);
        expect(haircutCheckbox.checked).toBe(true);

        fireEvent.click(haircutCheckbox);
        expect(haircutCheckbox.checked).toBe(false);
    });

    
});

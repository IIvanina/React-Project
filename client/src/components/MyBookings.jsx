import React, { useState, useEffect } from 'react';
import * as bookingService from '../services/bookingService';
import BookingDetails from './BookingDetails';

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const result = await bookingService.getAllBookingsForUser();
                setBookings(result);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    console.log(bookings);

    return (
        <div className='text-center mx-auto mb-5 mt-5 wow fadeInUp'>
            <h2 className="text-uppercase">My Bookings</h2>
            <ul>
                {bookings.map(booking => (
                    <BookingDetails key={booking._id} {...booking} />
                ))}
            </ul>
            {bookings.length === 0 && <p>No bookings yet</p>}
        </div>
    );
}

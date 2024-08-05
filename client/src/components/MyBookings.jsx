import React, { useState, useEffect, useContext } from 'react';
import * as bookingService from '../services/bookingService';
import BookingDetails from './BookingDetails';
import AuthContext from '../contexts/authContext.js';

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const { accessToken } = useContext(AuthContext);
    console.log(accessToken)
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const result = await bookingService.getAllBookingsForUser(accessToken);
                setBookings(result);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [accessToken]);

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

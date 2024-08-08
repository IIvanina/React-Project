import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as bookingService from '../services/bookingService';
import BookingList from './BookingList';

export default function MyBookings() {
    const { userId } = useParams();
    console.log(`ParMyBooking: ${userId}`)
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

    const removeBooking = (bookingId) => {
        setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
    };

    console.log(bookings);

    return (
        <div className='text-center mx-auto mb-5 mt-5 wow fadeInUp'>
            <h2 className="text-uppercase">My Bookings</h2>
            <ul>
                {bookings.map(booking => (
                    <BookingList key={booking._id} {...booking} removeBooking={removeBooking} />
                ))}
            </ul>
            {bookings.length === 0 && <p>No bookings yet</p>}
        </div>
    );
}

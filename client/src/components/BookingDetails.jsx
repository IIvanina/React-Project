import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/BookingDetails.module.css';
import * as bookingService from '../services/bookingService';

export default function BookingDetails({
    date,
    services,
    time,
    _id,
    removeBooking,
    updateBooking
}) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    const bookingDate = new Date(date);
    const now = new Date();
    const bookingId = _id;

    const deleteBookingHandler = async () => {
        try {
            await bookingService.deleteBooking(bookingId);
            removeBooking(bookingId);
            alert('Booking deleted successfully');
        } catch (error) {
            console.error('Error deleting booking:', error);
            alert('Failed to delete booking');
        }
    };

    const startEditingHandler = () => {
        navigate('/calendar', { state: { date, services, time, _id } });
    };

    const boxClass = bookingDate < now ? `${styles.detailsBox} ${styles.pastBooking}` : styles.detailsBox;

    return (
        <div className={boxClass}>
            {services.map(service => (
                <h3 key={`${service.name}${_id}`}>
                    {service.name} - {service.price} Euro
                </h3>
            ))}
            <ul className={styles.timeDetails}>
                <li>Date: {bookingDate.toLocaleDateString()}</li>
                <li>Hour: {time}</li>
            </ul>
            {bookingDate > now && (
                <>
                    <button className='btn btn-light w-100 py-3 mb-2' onClick={startEditingHandler}>Edit</button>
                    <button className='btn btn-primary w-100 py-3' onClick={deleteBookingHandler}>Delete</button>
                </>
            )}
        </div>
    );
}

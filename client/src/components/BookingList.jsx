import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/BookingDetails.module.css';

export default function BookingList({
    date,
    services = [], // Provide a default value of an empty array
    time,
    _id,
}) {

     
    const bookingDate = new Date(date);
    
    const now = new Date();
    const boxClass = bookingDate < now ? `${styles.detailsBox} ${styles.pastBooking}` : styles.detailsBox;

    return (
        <div className={boxClass}>
            {services.length > 0 ? (
                services.map(service => (
                    <h3 key={`${service.name}${_id}`}>
                        {service.name} - {service.price} Euro
                    </h3>
                ))
            ) : (
                <p>No services listed.</p>
            )}
            <ul className={styles.timeDetails}>
                <li>Date: {bookingDate.toLocaleDateString()}</li>
                <li>Hour: {time}</li>
            </ul>
            <Link to={`/booking/${_id}`}>
                <button>Details</button>
            </Link>
        </div>
    );
}

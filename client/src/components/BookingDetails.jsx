import styles from '../components/BookingDetails.module.css';
import * as bookingService from '../services/bookingService';

export default function BookingDetails({
    date,
    services,
    time,
    _id,
    removeBooking
}) {
    const bookingDate = new Date(date);
    const now = new Date();
    const bookingId = _id;

    const deleteBookingHandler = async () => {
        try {
            await bookingService.deleteBooking(bookingId);
            // Remove the booking from the state in the parent component
            removeBooking(bookingId);
            alert('Booking deleted successfully');
        } catch (error) {
            console.error('Error deleting booking:', error);
            alert('Failed to delete booking');
        }
    };

    return (
        <div className={styles.detailsBox}>
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
                    <button className='btn btn-light w-100 py-3 mb-2'>Edit</button>
                    <button className='btn btn-primary w-100 py-3' onClick={deleteBookingHandler}>Delete</button>
                </>
            )}
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../components/BookingDetails.module.css';
import * as bookingService from '../services/bookingService.js';
import * as notesService from '../services/notesServices.js';

export default function BookingDetails() {
    const { _id } = useParams(); // Use the correct parameter name
    console.log(`Parameter: ${_id}`);
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const fetchedBooking = await bookingService.getBookingById(_id);
                setBooking(fetchedBooking);
            } catch (error) {
                console.error('Failed to load booking details:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const fetchedComments = await notesService.getAll(_id);
                setComments(fetchedComments);
            } catch (error) {
                console.error('Failed to load comments:', error);
            }
        };

        fetchBookingDetails();
        fetchComments();
    }, [_id]);

    const deleteBookingHandler = async () => {
        try {
            await bookingService.deleteBooking(_id);
            navigate('/'); // Redirect to the MyBookings page after deletion
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    const startEditingHandler = () => {
        navigate('/calendar', { state: booking });
    };

    const addCommentHandler = async (e) => {
        e.preventDefault();
        try {
            const newComment = await notesService.create(_id, newCommentText);
            setComments([...comments, newComment]);
            setNewCommentText('');
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    if (!booking) {
        return <div>Loading...</div>;
    }

    const bookingDate = new Date(booking.date);
    const now = new Date();
    const boxClass = bookingDate < now ? `${styles.detailsBox} ${styles.pastBooking}` : styles.detailsBox;

    return (
        <div className={boxClass}>
            {booking.services.map(service => (
                <h3 key={`${service.name}${_id}`}>
                    {service.name} - {service.price} Euro
                </h3>
            ))}
            <ul className={styles.timeDetails}>
                <li>Date: {bookingDate.toLocaleDateString()}</li>
                <li>Hour: {booking.time}</li>
            </ul>
            <div className={styles.commentDetail}>
                <h5>Comments:</h5>
                <ul>
                    {comments.length > 0 ? (
                        comments.map(({ _id, text, _createdOn }) => (
                            <li key={_id} className="comment">
                                <p>{new Date(_createdOn).toLocaleString()}: <span className={styles.commentText}>{text}</span></p>
                            </li>
                        ))
                    ) : (
                        <p className="no-comment">No comments.</p>
                    )}
                </ul>
            </div>
            {bookingDate > now && (
                <>
                    <button className='btn btn-light w-100 py-3 mb-2' onClick={startEditingHandler}>Edit Booking</button>
                    <button className='btn btn-primary w-100 py-3' onClick={deleteBookingHandler}>Delete Booking</button>

                    <article className={styles.createComment}>
                        <label>Add new comment:</label>
                        <form className="form" onSubmit={addCommentHandler}>
                            <textarea 
                                name="comment" 
                                placeholder="Comment......" 
                                value={newCommentText}
                                onChange={(e) => setNewCommentText(e.target.value)}
                            ></textarea>
                            <input className="btn submit" type="submit" value="Add Comment" />
                        </form>
                    </article>
                </>
            )}
        </div>
    );
}

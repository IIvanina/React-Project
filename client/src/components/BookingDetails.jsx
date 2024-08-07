import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import styles from '../components/BookingDetails.module.css';
import * as bookingService from '../services/bookingService.js';
import * as notesService from '../services/notesServices.js';
import AuthContext from '../contexts/authContext.jsx';

export default function BookingDetails({
    date,
    services,
    time,
    _id,
    removeBooking,
}) {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');

    const { email } = useContext(AuthContext);

    const bookingDate = new Date(date);
    const now = new Date();
    const bookingId = _id;

    useEffect(() => {
        // Fetch comments
        const fetchComments = async () => {
            try {
                const fetchedComments = await notesService.getAll(bookingId);
                setComments(fetchedComments);
            } catch (error) {
                console.error('Failed to load comments:', error);
            }
        };

        fetchComments();
    }, [bookingId]);

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

    const addCommentHandler = async (e) => {
        e.preventDefault();

        try {
            const newComment = await notesService.create(bookingId, newCommentText);
            setComments([...comments, newComment]);
            setNewCommentText('');
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return isNaN(date) ? 'Invalid Date' : date.toLocaleString();
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
            <div className={styles.commentDetail}>
                <h5>Comments:</h5>
                <ul>
                    {comments.length > 0 ? (
                        comments.map(({ _id, text, _createdOn }) => (
                            <li key={_id} className="comment">
                                <p>{formatDate(_createdOn)}: <span className={styles.commentText}>{text}</span></p>
                            </li>
                        ))
                    ) : (
                        <p className="no-comment">No comments.</p>
                    )}
                </ul>
            </div>
            {bookingDate > now && (
                <>
                    <button className='btn btn-light w-100 py-3 mb-2' onClick={startEditingHandler}>Edit</button>
                    <button className='btn btn-primary w-100 py-3' onClick={deleteBookingHandler}>Delete</button>

                    <article className="create-comment">
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

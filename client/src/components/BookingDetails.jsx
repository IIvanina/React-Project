import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../components/BookingDetails.module.css';
import * as bookingService from '../services/bookingService.js';
import * as notesService from '../services/notesServices.js';
import AuthContext from '../contexts/authContext.jsx';
import * as likesService from '../services/likesService.js';

export default function BookingDetails() {
    const { _id } = useParams();
    const { username } = useContext(AuthContext);
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [booking, setBooking] = useState(null);
    const [likes, setLikes] = useState({});
    const [likedServices, setLikedServices] = useState(new Set()); // Track liked services

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

    useEffect(() => {
        const fetchLikes = async () => {
            if (booking && booking.services) {
                const likesData = {};
                for (let service of booking.services) {
                    const response = await likesService.getLikes(service.name);
                    likesData[service.name] = response.likes;
                }
                setLikes(likesData);
            }
        };

        if (booking && booking.services) {
            fetchLikes();
        }
    }, [booking]);

    useEffect(() => {
        // Retrieve liked services from local storage
        const storedLikes = JSON.parse(localStorage.getItem(`likedServices_${_id}`)) || [];
        setLikedServices(new Set(storedLikes));
    }, [_id]);

    useEffect(() => {
        // Persist liked services to local storage
        localStorage.setItem(`likedServices_${_id}`, JSON.stringify(Array.from(likedServices)));
    }, [likedServices, _id]);

    const deleteBookingHandler = async () => {
        if (booking && booking.services && booking.services.length > 0) {
            const serviceNames = booking.services.map(service => service.name).join(', ');
            const hasConfirmed = confirm(`Are you sure you want to delete the booking with services: ${serviceNames}`);
            if (hasConfirmed) {
                try {
                    await bookingService.deleteBooking(_id);
                    navigate(`/bookings/${username}`);
                } catch (error) {
                    console.error('Error deleting booking:', error);
                }
            }
        } else {
            alert('No services to delete.');
        }
    };

    const startEditingHandler = () => {
        navigate(`/calendar/${username}`, { state: booking });
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

    const handleLike = async (service) => {
        if (likedServices.has(service)) {
            alert('You have already liked this service.');
            return;
        }

        try {
            const updatedData = await likesService.incrementLike(service);
            setLikes((prevLikes) => ({
                ...prevLikes,
                [service]: (prevLikes[service] || 0) + 1,
            }));
            setLikedServices(new Set([...likedServices, service])); // Mark service as liked
        } catch (error) {
            console.error('Error incrementing like:', error);
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
                <div key={`${service.name}${_id}`}>
                    <h3>
                        {service.name} - {service.price} Euro
                    </h3>
                    <button onClick={() => handleLike(service.name)}>
                        Like
                    </button>
                    <span> {likes[service.name] || 0} Likes</span>
                </div>
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

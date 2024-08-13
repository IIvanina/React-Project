import React, { useReducer, useEffect } from 'react';
import { useNavigate, useLocation,  useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../components/BookingCalendar.module.css';
import * as bookingService from '../services/bookingService';

const services = [
    { name: 'Haircut', price: 20 },
    { name: 'Beard Trim', price: 10 },
    { name: 'Mans Shave', price: 15 },
    { name: 'Hair Dyeing', price: 12 },
    { name: 'Mustache', price: 18 },
    { name: 'Stacking', price: 16 },
];

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];


function reducer(state, action) {
    switch (action.type) {
        case 'SET_DATE':
            return { ...state, selectedDate: action.payload, loading: true };
        case 'SET_SERVICES':
            return { ...state, selectedServices: action.payload };
        case 'SET_BOOKED_SLOTS':
            return { ...state, bookedSlots: action.payload, allSlotsBooked: action.allSlotsBooked, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_EDITING':
            return { ...state, isEditing: action.payload.isEditing, bookingId: action.payload.bookingId };
        case 'SET_TIME':
            return { ...state, selectedTime: action.payload };
        default:
            throw new Error('Unknown action type');
    }
}

export default function BookingCalendar() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialBooking = location.state || null;
    console.log(initialBooking)
    const { username } = useParams();
    

    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() - 1);

    const initialState = {
        selectedDate: initialBooking ? new Date(initialBooking.date) : initialDate,
        selectedServices: initialBooking ? initialBooking.services.map(service => service.name) : [],
        bookedSlots: [],
        allSlotsBooked: false,
        loading: true,
        selectedTime: initialBooking ? initialBooking.time : null,
        isEditing: !!initialBooking,
        bookingId: initialBooking ? initialBooking._id : null,
    };

    console.log(initialState.selectedDate)    

    const [state, dispatch] = useReducer(reducer, initialState);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of day in local time
    const todayUTC = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    useEffect(() => {
        const fetchBookings = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {

                console.log(state.selectedDate)
                const result = await bookingService.getBookingsForDate(state.selectedDate);
                const booked = result.map(booking => booking.time);

                const allBooked = timeSlots.every(slot => booked.includes(slot));
                dispatch({ type: 'SET_BOOKED_SLOTS', payload: booked, allSlotsBooked: allBooked });
            } catch (error) {
                console.error('Error fetching bookings:', error);
                dispatch({ type: 'SET_BOOKED_SLOTS', payload: [], allSlotsBooked: false });
            }
        };

        fetchBookings();
    }, [state.selectedDate]);

    const onDateChange = (date) => {
        
        const localDate = new Date(date);
        localDate.setHours(0, 0, 0, 0);
        const localDateUTC = localDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        if (localDateUTC >= todayUTC) {
            dispatch({ type: 'SET_DATE', payload: date });
        }
    };

    const onServiceChange = (event) => {
        const { value, checked } = event.target;
        const service = services.find(service => service.name === value);

        if (checked) {
            dispatch({ type: 'SET_SERVICES', payload: [...state.selectedServices, service.name] });
        } else {
            dispatch({ type: 'SET_SERVICES', payload: state.selectedServices.filter(s => s !== service.name) });
        }
    };

    const bookSlot = async (slot) => {
        if (state.selectedServices.length === 0) {
            alert('Please select at least one service before booking.');
            return;
        }

        const bookingData = {
            date: state.selectedDate,
            time: slot,
            services: state.selectedServices.map(serviceName => {
                const service = services.find(s => s.name === serviceName);
                return { name: service.name, price: service.price };
            }),
        };

        try {
            if (state.isEditing) {
                await bookingService.updateBooking(state.bookingId, bookingData);
                alert(`Booking updated for ${state.selectedDate.toDateString()} at ${slot}`);
            } else {
                await bookingService.create(bookingData);
                alert(`Booking confirmed for ${state.selectedDate.toDateString()} at ${slot}`);
            }

            navigate(`/bookings/${username}`);
        } catch (error) {
            console.error('Error creating/updating booking:', error);
            alert('Failed to book slot. Please try again.');
        }
    };

    return (
        <div className={styles.bookingCalendar}>
            <div className={styles.serviceSelection}>
                <h2>Select Services:</h2>
                {services.map(service => (
                    <div key={service.name}>
                        <input
                            type="checkbox"
                            id={service.name}
                            value={service.name}
                            onChange={onServiceChange}
                            checked={state.selectedServices.includes(service.name)}
                        />
                        <label className={styles.serviceLabel} htmlFor={service.name}>
                            {service.name} - ${service.price}
                        </label>
                    </div>
                ))}
            </div>
            <Calendar
                onChange={onDateChange}
                value={state.selectedDate}
                minDate={today} // Disable past dates but allow today
                defaultValue={initialDate} 
            />
            <div className={styles.timeSlots}>
                <h2>Available Slots on {state.selectedDate.toDateString()}</h2>
                {state.loading ? (
                    <p>Loading...</p>
                ) : state.allSlotsBooked ? (
                    <p>All slots are booked for this date.</p>
                ) : (
                    <div className={styles.slots}>
                        {timeSlots.map((slot) => (
                            <span key={slot}>
                                <button
                                    onClick={() => bookSlot(slot)}
                                    disabled={state.bookedSlots.includes(slot)}
                                >
                                    {slot} {state.bookedSlots.includes(slot) ? '(Booked)' : ''}
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

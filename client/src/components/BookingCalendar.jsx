import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../components/BookingCalendar.module.css';
import * as bookingService from '../services/bookingService';

const services = [
    { name: 'Haircut', price: 20 },
    { name: 'Shampoo', price: 10 },
    { name: 'Nail Trim', price: 15 },
    { name: 'Ear Cleaning', price: 12 },
    { name: 'Teeth Brushing', price: 18 }
];

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];

export default function BookingCalendar() {
    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() - 1);

    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [selectedServices, setSelectedServices] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [allSlotsBooked, setAllSlotsBooked] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of day in local time
    const todayUTC = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const result = await bookingService.getBookingsForDate(selectedDate);
                const booked = result.map(booking => booking.time);

                const allBooked = timeSlots.every(slot => booked.includes(slot));
                setBookedSlots(booked);
                setAllSlotsBooked(allBooked);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setBookedSlots([]);
                setAllSlotsBooked(false);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [selectedDate]);

    const onDateChange = (date) => {
        // Convert date to local time and ensure it's not before today
        const localDate = new Date(date);
        localDate.setHours(0, 0, 0, 0);
        const localDateUTC = localDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        if (localDateUTC >= todayUTC) {
            setSelectedDate(date);
        }
    };

    const onServiceChange = (event) => {
        const { value, checked } = event.target;
        const service = services.find(service => service.name === value);

        if (checked) {
            setSelectedServices([...selectedServices, service]);
        } else {
            setSelectedServices(selectedServices.filter(s => s.name !== value));
        }
    };

    const bookSlot = async (slot) => {
        if (selectedServices.length === 0) {
            alert('Please select at least one service before booking.');
            return;
        }

        const bookingData = {
            date: selectedDate.toISOString(),
            time: slot,
            services: selectedServices
        };

        try {
            const result = await bookingService.create(bookingData);
            // Re-fetch bookings to ensure the state is up-to-date
            await fetchBookings();
            
            alert(`Booking confirmed for ${selectedDate.toDateString()} at ${slot}`);
            navigate('/bookings');
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to book slot. Please try again.');
        }
    };

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const result = await bookingService.getBookingsForDate(selectedDate);
            const booked = result.map(booking => booking.time);
            const allBooked = timeSlots.every(slot => booked.includes(slot));
            setBookedSlots(booked);
            setAllSlotsBooked(allBooked);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookedSlots([]);
            setAllSlotsBooked(false);
        } finally {
            setLoading(false);
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
                        />
                        <label className={styles.serviceLabel} htmlFor={service.name}>
                            {service.name} - ${service.price}
                        </label>
                    </div>
                ))}
            </div>
            <Calendar
                onChange={onDateChange}
                value={selectedDate}
                minDate={today} // Disable past dates but allow today
            />
            <div className={styles.timeSlots}>
                <h2>Available Slots on {selectedDate.toDateString()}</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : allSlotsBooked ? (
                    <p>All slots are booked for this date.</p>
                ) : (
                    <div className={styles.slots}>
                        {timeSlots.map((slot) => (
                            <span key={slot}>
                                <button
                                    onClick={() => bookSlot(slot)}
                                    disabled={bookedSlots.includes(slot)}
                                >
                                    {slot} {bookedSlots.includes(slot) ? '(Booked)' : ''}
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// File: src/components/BookingCalendar.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingCalendar.css';
import { create, getBookingsForDate } from '../services/bookingService';

const services = [
    'Haircut',
    'Shampoo',
    'Nail Trim',
    'Ear Cleaning',
    'Teeth Brushing'
];

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', 
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];

export default function BookingCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    console.log(selectedDate)
    const [selectedServices, setSelectedServices] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [allSlotsBooked, setAllSlotsBooked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const result = await getBookingsForDate(selectedDate);
                const booked = result.map(booking => booking.time);

                const allBooked = timeSlots.every(slot => booked.includes(slot));
                console.log(allBooked)
                setBookedSlots(booked);
                // setAllSlotsBooked(allBooked);
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
        setSelectedDate(date);
    };

    const onServiceChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedServices([...selectedServices, value]);
        } else {
            setSelectedServices(selectedServices.filter(service => service !== value));
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
            const result = await create(bookingData);
            const newBookedSlots = [...bookedSlots, slot];
            const allBooked = timeSlots.every(slot => newBookedSlots.includes(slot));

            setBookedSlots(newBookedSlots);
            setAllSlotsBooked(allBooked);
            alert(`Booking confirmed for ${selectedDate.toDateString()} at ${slot}`);
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to book slot. Please try again.');
        }
    };
    console.log(allSlotsBooked)
    return (
        <div className="booking-calendar">
            <div className="service-selection">
                <h2>Select Services</h2>
                {services.map(service => (
                    <div key={service}>
                        <input 
                            type="checkbox" 
                            id={service} 
                            value={service} 
                            onChange={onServiceChange}
                        />
                        <label htmlFor={service}>{service}</label>
                    </div>
                ))}
            </div>
            <Calendar
                onChange={onDateChange}
                value={selectedDate}
            />
            <div className="time-slots">
                <h2>Available Slots on {selectedDate.toDateString()}</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : allSlotsBooked ? (
                    <p>All slots are booked for this date.</p>
                ) : (
                    <div className="slots">
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

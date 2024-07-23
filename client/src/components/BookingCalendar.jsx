import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingCalendar.css';
import { create } from '../services/bookingService';

const services = [
    'Haircut',
    'Shampoo',
    'Nail Trim',
    'Ear Cleaning',
    'Teeth Brushing'
];

export default function BookingCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedServices, setSelectedServices] = useState([]);
    const [bookings, setBookings] = useState([]);

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
        const bookingData = {
            date: selectedDate,
            time: slot,
            services: selectedServices
        };

        try {
            const result = await create(bookingData);
            setBookings([...bookings, result]);
            alert(`Booking confirmed for ${selectedDate.toDateString()} at ${slot}`);
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to book slot. Please try again.');
        }
    };

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
                <div className="slots">
                    {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map((slot) => (
                        <span key={slot}>
                            <button onClick={() => bookSlot(slot)}>
                                {slot}
                            </button>
                        </span>
                    ))}
                </div>
            </div>
            
        </div>
    );
}


const baseUrl = 'http://localhost:3030/jsonstore';

export const create = async (data) => {
    const responce = await fetch (`${baseUrl}/booking`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await responce.json();
    return result
};

export const getBookingsForDate = async (date) => {
    try {
        // Fetch all bookings
        const response = await fetch(`${baseUrl}/booking`);
        const result = await response.json();
        console.log('All Bookings:', result);

        // Convert result to an array of bookings
        const bookingsArray = Object.values(result);

        // Extract the date part from the selected date
        const selectedDateISO = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Filter bookings for the selected date
        const bookingsForDate = bookingsArray.filter(booking => {
            const bookingDateISO = new Date(booking.date).toISOString().split('T')[0];
            return bookingDateISO === selectedDateISO;
        });

        console.log('Bookings for Selected Date:', bookingsForDate);
        return bookingsForDate;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
};
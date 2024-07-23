

const baseUrl = 'http://localhost:3030/jsonstore';

export const create = async (data) => {
    const response = await fetch(`${baseUrl}/booking`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
};

export const getBookingsForDate = async (date) => {
    // Ensure the date is in ISO format without time (UTC)
    const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    const response = await fetch(`${baseUrl}/booking?date=${formattedDate}`);
    const result = await response.json();

    // Convert the object to an array and filter by the exact date
    const bookingsArray = Object.values(result).filter(booking => 
        booking.date.startsWith(formattedDate)
    );

    return bookingsArray;
};

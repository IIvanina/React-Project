

const baseUrl = 'http://localhost:3030/jsonstore/booking';

export const create = async (data) => {
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
};

export const getAllBookingsForUser = async () => {
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return Object.values(result);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
}

export const getBookingsForDate = async (date) => {
    // Ensure the date is in ISO format without time (UTC)
    const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    console.log(formattedDate)
    const response = await fetch(`${baseUrl}?date=${formattedDate}`);
    const result = await response.json();
    
    // Convert the object to an array and filter by the exact date
    const bookingsArray = Object.values(result).filter(booking => 
        booking.date.startsWith(formattedDate)
    );

    console.log(bookingsArray)

    return bookingsArray;
};

// export const getBookingsForDate = async (date) => {
//     // Ensure the date is in ISO format without time (UTC)
//     const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
//     console.log(formattedDate);

//     // Construct the query string with the where parameter
//     const query = new URLSearchParams({
//         where: `date="${formattedDate}"`
//     });

//     // Fetch the data from the API
//     const response = await fetch(`${baseUrl}?${query.toString()}`);
//     const result = await response.json();
//     console.log(result);

//     // Convert the object to an array if necessary
//     const bookingsArray = Array.isArray(result) ? result : Object.values(result);

//     console.log(bookingsArray);

//     return bookingsArray;
// };

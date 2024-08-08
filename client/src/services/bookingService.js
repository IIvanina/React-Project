const baseUrl = 'http://localhost:3030/data';

const getToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('Token not found in localStorage');
    }
    return token;
};

const getUserId = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        throw new Error('User ID not found in localStorage');
    }
    return userId;
};

export const create = async (data) => {
    const userId = getUserId(); 
    const token = getToken();

    const bookingData = {
        ...data,
        _ownerId: userId
    };

    try {
        const response = await fetch(`${baseUrl}/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(bookingData)
        });

        console.log(`USER-ID2: ${bookingData._ownerId}`); 

        if (!response.ok) {
            const errorText = await response.text(); 
            console.error('Error response from server:', errorText);
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export const getAllBookingsForUser = async () => {
    const userId = getUserId(); 
    const token = getToken(); 
    const encodedQuery = encodeURIComponent(`_ownerId="${userId}"`);

    try {
        const response = await fetch(`${baseUrl}/booking?where=${encodedQuery}`, {
            headers: {
                'X-Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return Object.values(result);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};

export const getBookingsForDate = async (date) => {
    const token = getToken(); 

    const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    console.log(formattedDate);

    try {
        const response = await fetch(`${baseUrl}/booking?date=${formattedDate}`, {
            headers: {
                'X-Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        const bookingsArray = Object.values(result).filter(booking =>
            booking.date.startsWith(formattedDate)
        );

        console.log(bookingsArray);

        return bookingsArray;
    } catch (error) {
        console.error('Error fetching bookings for date:', error);
        throw error;
    }
};


export const deleteBooking = async (bookingId) => {
    const token = getToken(); 

    try {
        const response = await fetch(`${baseUrl}/booking/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': token
            }
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            console.error('Error response from server:', errorText);
            throw new Error('Network response was not ok');
        }

        return response;
    } catch (error) {
        console.error('Error deleting booking:', error);
        throw error;
    }
};

export const updateBooking = async (bookingId, data) => {
    const token = getToken();

    try {
        const response = await fetch(`${baseUrl}/booking/${bookingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response from server:', errorText);
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating booking:', error);
        throw error;
    }
};


export const getBookingById = async (bookingId) => {
    const token = getToken();

    try {
        const response = await fetch(`${baseUrl}/booking/${bookingId}`, {
            headers: {
                'X-Authorization': token
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response from server:', errorText);
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching booking:', error);
        throw error;
    }
};
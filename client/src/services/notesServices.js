const baseUrl = 'http://localhost:3030/data/comments';

const getToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('Token not found in localStorage');
    }
    return token;
};

export const create = async (bookingId, text) => {
    const token = getToken();
    const commentData = {
        text,
        bookingId
    };
    
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(commentData)
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const newComment = await response.json();
        return newComment;
    } catch (error) {
        console.error('Failed to create comment:', error);
        throw error;
    }
};

export const getAll = async (bookingId) => {
    const token = getToken();
    const query = new URLSearchParams({
        where: `bookingId="${bookingId}"`,
        load: `owner=_ownerId:users`,
    });

    try {
        const response = await fetch(`${baseUrl}?${query}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        throw error;
    }
};

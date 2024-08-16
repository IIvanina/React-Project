// const baseUrl = `${import.meta.env.VITE_API_URL}/data/likes`;
const baseUrl = 'http://localhost:3030/data/likes'

const getToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('Token not found in localStorage');
    }
    return token;
};

export const getLikes = async (service) => {
    
    try {
        const response = await fetch(`${baseUrl}?where=service%3D%22${service}%22`);
        if (!response.ok) {
            throw new Error(`Failed to fetch likes for ${service}`);
        }
        const data = await response.json();

        // Tallying likes if multiple records exist
        const totalLikes = data.reduce((acc, curr) => acc + 1, 0);

        return { service, likes: totalLikes };
    } catch (error) {
        console.error('Error fetching likes:', error);
        throw error;
    }
};

export const incrementLike = async (service) => {
    const token = getToken();
    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            },
            body: JSON.stringify({ service }), 
        });

        if (!response.ok) {
            throw new Error(`Error incrementing like for ${service}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error incrementing like:', error);
        throw error;
    }
};

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        // Handle non-200 responses
        const errorMessage = await response.text();
        throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const result = await response.json();
    localStorage.setItem('accessToken', result.accessToken); // Store the token
    return result;
}

export const register = async (email, password, name) => {
    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        console.error("No token found for logout.");
        return; 
    }

    try {
        const response = await fetch(`${baseUrl}/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
        });

        if (response.status === 204) {
            localStorage.removeItem('accessToken'); // Clear the token from local storage
            console.log("Token removed from local storage.");
            return {}; 
        } else {
            const errorMessage = await response.text();
            console.error("Logout response not ok:", errorMessage);
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }
    } catch (error) {
        console.error("Logout failed", error);
        throw error;
    }
}


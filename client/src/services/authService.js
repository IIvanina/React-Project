const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })  // Convert the body to a JSON string
    });

    if (!response.ok) {
        // Handle non-200 responses
        const errorMessage = await response.text();
        throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const result = await response.json();
    return result;
}

const baseUrl = 'http://localhost:3030/jsonstore'

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
}
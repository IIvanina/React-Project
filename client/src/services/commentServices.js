const baseUrl = 'http://localhost:3030/jsonstore/comments'

export const create = async (data) => {
    const comment = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'constent-type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    )
}
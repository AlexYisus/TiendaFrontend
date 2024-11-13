export const getClientToken = () => {
    return fetch('http://localhost:5000/api/generate/token', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(err => console.log(err))
}

export const makePayment = (data) => {
    return fetch('http://localhost:5000/api/process/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .catch(err => console.log(err))
}
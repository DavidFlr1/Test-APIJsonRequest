// Set connection to the API by its method request
// Define token key alocated on .env file
const token = {Authorization: process.env.REACT_APP_TOKEN_PUBLIC_KEY}

// Define method with its key
    const connect = {
        method: 'get',
        headers: token,
        mode: 'cors',
        cache: 'default'
    };

// Request data
    const myRequest = new Request('https://eshop-deve.herokuapp.com/api/v2/orders', connect)

export default myRequest
const server = require('./server.js');
const cors = require('cors')({origin: true});

const { onRequest } = require("firebase-functions/v2/https");

exports.api = onRequest((req, res) => {
    // Use CORS middleware to handle preflight and actual requests
    cors(req, res, () => {
        // Call your server handler
        server.emit('request', req, res);
    });
});

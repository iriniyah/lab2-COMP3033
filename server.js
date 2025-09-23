// Import Connect and URL
const connect = require('connect');
const url = require('url');

// App Object
const app = connect();

// Middlewear function for calculator 
function calculator(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    res.end("Hello world of APIs");
}

// Associate function to path
app.use("/lab2", calculator);

// Start Server
app.listen(3000);
console.log("Listening on http://localhost:3000");
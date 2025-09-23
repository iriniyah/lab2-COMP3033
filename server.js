// Import Connect and URL
const connect = require('connect');
const url = require('url');

// App Object
const app = connect();

// Middlewear function for calculator 
function calculator(req, res, next) {
    // Set the content type as JSON
    res.setHeader("Content-Type", "application/json");

    // Response Object for the equation with placeholder data
    let equationResObj = {
        x: 1,
        y: 2,
        operation: 3,
        result: 24
    };

    // Converts the JSON Obj to a JSON formatted string to pass through the argument 
    res.end(JSON.stringify(equationResObj));
}

// Associate function to path
app.use("/lab2", calculator);

// Start Server
app.listen(3000);
console.log("Listening on http://localhost:3000");
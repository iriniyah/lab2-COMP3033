// Import Connect and URL
const connect = require('connect');
const url = require('url');

// Create App Object
const app = connect();

// Middleware function for calculator based off query parameters
function calculator(req, res, next) {
    // Set the Content-Type as JSON
    res.setHeader("Content-Type", "application/json");

    // Instantiate variables for query items
    let x, y, method;

    // Store the parsed URL as an Object 
    let parsedUrl = url.parse(req.url, true);

    // Store the query parameters from the parsed URL as an Object
    let query = parsedUrl.query;

    // Validates required query parameters
    if (query.x == null) {
        res.statusCode = 400;
        res.end("ERROR! \nPlease provide a value for x.\nExample: x=2");
    } else if (query.y == null) {
        res.statusCode = 400;
        res.end("ERROR! \nPlease provide a value for y.\nExample: y=4");
    } else if (query.method == null) {
        res.statusCode = 400;
        res.end("ERROR! \nPlease provide a method type.\nAccepted Types: add, subtract, multiply, divide \nExample: method=add");
    } else {
        // Assign variables using each property in the query object
        // Convert x and y to number types
        x = Number(query.x);
        y = Number(query.y);
        method = query.method;

        // Validates that x and y are numbers
        if (isNaN(x) || isNaN(y)) {
            res.statusCode = 400;
            res.end("ERROR! \nPlease input a number as x and/or y.\nExample: x=5 y=44");
        }
    }
    
    // Conduct calculation based off operation
    switch (method) {
        case 'add':
            result = x + y;
            break;
        case 'subtract':
            result = x - y;
            break;
        case 'multiply':
                result = x * y;
            break;
        case 'divide':
            result = x / y;
            break;
        default:
            res.statusCode = 400;
            res.end("ERROR\nMethod type incorrect. \nPlease enter 'add', 'subtract', 'multiply', or 'divide'.")
            return;
    }

    // Store queries and result from calculation as response Object
    let equationResObj = {
        x: x,
        y: y,
        operation: method,
        result: result
    };

    // Convert to a JSON formatted string and send as the response
    res.end(JSON.stringify(equationResObj));
}

// Associate function to path
app.use("/lab2", calculator);

// Start Server
app.listen(3000);
console.log("Listening on http://localhost:3000");
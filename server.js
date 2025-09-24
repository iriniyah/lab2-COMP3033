// Import Connect and URL
const connect = require('connect');
const { type } = require('os');
const url = require('url');

// App Object
const app = connect();

// Middlewear function for calculator 
function calculator(req, res, next) {
    // Set the content type as JSON
    res.setHeader("Content-Type", "application/json");

    // Instantiate variables
    let method, x, y, operation, result;

    // Store the parsed URL as an object 
    let parsedUrl = url.parse(req.url, true);
    // Format the URL to get the queries (becomes a string)
    let formattedUrl = url.format(parsedUrl);
    // Remove the '/?' from the beginning of the string
    let removedCharsURL = formattedUrl.slice(2);
    // Separate the queries into an array
    let queries = removedCharsURL.split("&");

    // Array to check if all 3 components are available
    let queryChecker = [false, false, false];

    // Loop to split each string at '=' and set each variable appropriately
    for (var i = 0; i < queries.length; i++) {
        // Split the string in each array index
        queries[i] = queries[i].split("=");

        // Switch statement to set each variable appropriately without the 
        // user needing to commit to a specific order
        switch (queries[i][0]) {
            case 'method':
                method = queries[i][1];
                queryChecker[0] = true;
                break;
            case 'x':
                x = Number(queries[i][1]);
                queryChecker[1] = true;
                break;
            case 'y':
                y = Number(queries[i][1]);
                queryChecker[2] = true;
            default:
                break;
        }
    }

    // Check if all components are present
    if (queryChecker[0] == true && queryChecker[1] == true && queryChecker[2] == true) {
        // Conduct calculation 
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
                res.end("Method type incorrect. Please enter 'add', 'subtract', 'multiply', or 'divide'.")
                return;
        }

        // Response Object for the equation and parameters 
        let equationResObj = {
            x: x,
            y: y,
            operation: method,
            result: result
        };

        // Converts the JSON Obj to a JSON formatted string to pass through the argument 
        res.end(JSON.stringify(equationResObj));
    } else {
        res.write("One or more queries are missing or incorrect.\n");
        res.write("Required queries are:\n- x\n- y\n- method (add, subtract, multiply, divide)\n");
        res.end("Please try again.");
    }
}

// Associate function to path
app.use("/lab2", calculator);

// Start Server
app.listen(3000);
console.log("Listening on http://localhost:3000");
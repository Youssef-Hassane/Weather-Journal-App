/**
 * In order to solve this project I needed to do some steps first, which are:
 *     
 *      1. Installing the Node.js on my machine(computer) from the following URL https://nodejs.org/en/download/
 * 
 *      2. Installing the Node package called Express, by running the "npm install express" command in the Terminal.
 * 
 *      3. Installing the Node package called CORS, by running the "npm install cors" command in the Terminal.
 * 
 *      4. Installing the Node package called CORS, by running the "npm install body-parser" command in the Terminal.
 *      
 */


// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Port number
const portNumber = 8080;

// Host name
const hostName = "localhost";

const hostNumber = "127.0.0.1";


// Require Express to run server and routes
/** I used the express in order to run server and routes. */
const express = require('express');

// Start up an instance of app
/** Here I start up an instance of app.*/ 
const app = express();

/**
 * 
 * "Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins 
 *  (domain, scheme, or port) other than its own from which a browser should permit loading resources. CORS also relies 
 *  on a mechanism by which browsers make a "preflight" request to the server hosting the cross-origin resource, in order to 
 *  check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP 
 *  method and headers that will be used in the actual request" (HTTP | MDN, n.d.a, para. 1).
 * 
 */

// Cors for cross origin allowance
/**Our front end can communicate with the server thanks to CORS, which allows us to establish a cross-origin resource sharing policy.*/
const cors = require("cors");

// All CORS Requests Must Be Enabled
app.use(cors());

/* Dependencies */
const bodyParser = require('body-parser')


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));





// Setup Server
//
// Get method route
// When a GET request is made to the homepage, respond with a JavaScript object.
app.get("/all", 
    function getAllMethodRequests (req, res){
        // The res.status() function changed the response's HTTP status. 
        // res.status() is a chainable alias of Node’s response.statusCode.
        // The HTTP 200 OK success status response code indicates that the request has succeeded. 
        // A 200 response is cacheable by default (HTTP | MDN, n.d.b).
        // Sent the data "projectData" 
        res.status(200).send(projectData);
    }
);

/**
 * 
 * Notice that, I can do the previous in two different ways:
 * 
 * 1). 
 *      app.get("/all", getAllMethodRequests)
 *      
 *      function getAllMethodRequests (req, res){
 *          // The res.status() function changed the response's HTTP status. 
 *          // res.status() is a chainable alias of Node’s response.statusCode.
 *          // The HTTP 200 OK success status response code indicates that the request has succeeded.
 *          // A 200 response is cacheable by default (HTTP | MDN, n.d.b). 
 *          // Sent the data "projectData" 
 *          res.status(200).send(projectData);
 *      }
 * 
 * 2).
 *      app.get("/all", 
 *          (req, res) => {
 *              // The res.status() function changed the response's HTTP status. 
 *              // res.status() is a chainable alias of Node’s response.statusCode.
 *              // The HTTP 200 OK success status response code indicates that the request has succeeded.
 *              // A 200 response is cacheable by default (HTTP | MDN, n.d.b). 
 *              // Sent the data "projectData"
 *              res.status(200).send(projectDatas);
 *          }
 *    
 */

// POST method route
app.post("/add", 
    function postTheInformation (req, res){
        projectData = req.body;
        // Print the value of projectData in the console
        console.log(projectData);
    }
);

/**
 * 
 * Notice that, I can do the previous in two different ways:
 * 
 * 1). 
 *      app.post("/all", postTheInformation);
 *      
 *      function postTheInformation (req, res){
 *      projectData = req.body;
 *      // Print the value of projectData in the console
 *      console.log(projectData);
 *      
 *      }
 * 
 * 2).
 *      app.get("/all", 
 *          (req, res) => {
 *              projectData = req.body;
 *              // Print the value of projectData in the console
 *              console.log(projectData);
 *      
 *      });
 *    
 */



// spin up the server
app.listen(portNumber, function (){
    console.log("The server is running.");
    console.log(`The server is running on the ${hostName} (${hostNumber}) using the ${portNumber} port`);
    console.log(`The full URL is:\n     http://${hostName}:${portNumber}/ \n     Or \n     http://${hostNumber}:${portNumber}/`);
});













/**
 * 
 * References
 * 
 * HTTP | MDN. (n.d.a). Cross-origin resource sharing (CORS) - http: MDN. HTTP | MDN. Retrieved March 13, 2022, from https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS 
 * HTTP | MDN. (n.d.b). 200 OK - http: MDN. HTTP | MDN. Retrieved March 14, 2022, from https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200 
 * 
 */
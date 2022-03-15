/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Port number
const portNumber = 8080;

// Host name/number
const hostName = "localhost";
const hostNumber = "127.0.0.1";

/**
 *  According to OpenWeatherMap (n.d.), in order to call the current weather data by using zip code
 *  I need to use the following code: 
 *  "api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}" 
 *  As mentioned in the OpenWeatherMap website if I didn't used "{country code}" the default country 
 *  would be the United State of America (US).
 */ 
const theURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

/**
 *  My API Key is: 159abb56dd041a28caa22534f5a7f464
 *  According to OpenWeatherMap (n.d.), "Units of measurement. standard, metric and imperial units 
 *  are available. If you do not use the units parameter, standard units will be applied by default" (para. #).
 * 
 *  Therefore, I'm using the "&units=metric" in order to make the temperature in Celsius. 
 */
const apiKey = ",&appid=159abb56dd041a28caa22534f5a7f464&units=metric";

// the URL of the server
const theURLOfTheServer = `http://${hostNumber}:${portNumber}`;

/**
 *{
 *  "coord": {
 *    "lon": -122.08,
 *    "lat": 37.39
 *  },
 *  "weather": [
 *    {
 *      "id": 800,
 *      "main": "Clear",
 *      "description": "clear sky",
 *      "icon": "01d"
 *    }
 *  ],
 *  "base": "stations",
 *  "main": {
 *    "temp": 282.55,
 *    "feels_like": 281.86,
 *    "temp_min": 280.37,
 *    "temp_max": 284.26,
 *    "pressure": 1023,
 *    "humidity": 100
 *  },
 *  "visibility": 16093,
 *  "wind": {
 *    "speed": 1.5,
 *    "deg": 350
 *  },
 *  "clouds": {
 *    "all": 1
 *  },
 *  "dt": 1560350645,
 *  "sys": {
 *    "type": 1,
 *    "id": 5122,
 *    "message": 0.0139,
 *    "country": "US",
 *    "sunrise": 1560343627,
 *    "sunset": 1560396563
 *  },
 *  "timezone": -25200,
 *  "id": 420006353,
 *  "name": "Mountain View",
 *  "cod": 200
 *  }                         
 */



//This function will work after the user click the button
function generate(){

    // From the index.html file:
    //      <input type="text" id="zip" placeholder="enter zip code here">
    // By using the .getElementById method I can select the element that has id called "zip"
    // Get the value (zip code) that the user entered by using .value method.
    let theZipCode = document.getElementById("zip").value;

    // From the index.html file:
    //      <textarea class= "myInput" id="feelings" placeholder="Enter your feelings here" rows="9" cols="50"></textarea>
    // By using the .getElementById method I can select the element that has id called "feelings"
    // Get the value (feelings) that the user entered by using .value method.
    let theFeelings = document.getElementById("feelings").value;


    getInformation(theZipCode).then(
        // Getting the information by using the Zip Code
        function informationFromTheZipCode(infoZipCode) {
            
            let postURL = theURLOfTheServer + "/add";

            if(infoZipCode){
                const {
                    main: { temp },
                    main: { feels_like },
                    main: { temp_min },
                    main: { temp_max },
                    wind: { speed },
                    sys: {country},
                    name: city,
                    weather: [{ description }],
                    weather: [{ main }],
                } = infoZipCode;
                //Creating the object contain the information that is going to be display on the webpage
                let informationToTheServer = {
                    newDate,
                    country,
                    city,
                    temp,
                    feels_like,
                    temp_min,
                    temp_max,
                    speed,
                    description,
                    main,
                    theFeelings,
                };

                postTheInformation(postURL, informationToTheServer); 
                updateTheUserInterface();                
            };
        }
    );
}


document.getElementById("generate").addEventListener("click", generate);


// Post the information
async function postTheInformation( theURL = "", information = {}) {

    const postObject = {
        // Since the default method is GET I need to change it to POST
        method: "POST",
        headers: {"Content-Type": "application/json",},
        // According to Udacity (n.d.), "Body data type must match "Content-Type" header" (para. #).
        body: JSON.stringify(information),
    }
    
    // Using the fetch method in order to post the information
    const response = await fetch(theURL, postObject);
    
    try {
        const newInformation = await response.json();
        return newInformation;
    } catch (error) {
        console.log(error);
    }
}


// Get information that the user asked for
async function getInformation(theZipCode){
    try {
        // Combine the the theURL, zip, and apiKey variables in order to create the URL
        let theFullURL = theURL+theZipCode+apiKey; 
        // and then fetch the information and save it in the response variable
        let response = await fetch(theFullURL);
        // Adding the .json() to the response from the API will help us to deals with the information
        let information = await response.json();
        //Display an alert to the user with the error
        if (information.cod != 200) {
            alert(information.message);
        }
        // Return the information
        return information;
    } catch (error) {
        // Catch the error and display it in the console
        // handle an error
        console.log(error);
    }
}


// Updating The User Interface
async function updateTheUserInterface(){
    const updateURL = theURLOfTheServer + "/all";
    // Fetching the information 
    const response = await fetch(updateURL);
    try {
        // Make the information json so that I can use them
        const newInformation = await response.json();
        // By using the .getElementById method I can select the element that I need
        // By using the .innerHTML method I can update/add the new information
        document.getElementById("date").innerHTML        = "Date: " + newInformation.newDate;
        document.getElementById("country").innerHTML     = "Country: " + newInformation.country;
        document.getElementById("city").innerHTML        = "City: " + newInformation.city;
        document.getElementById("temp").innerHTML        = "Temperature: " + newInformation.temp + "&degC";
        document.getElementById("temp_max").innerHTML    = "Max Temperature: " + newInformation.temp_max + "&degC";
        document.getElementById("temp_min").innerHTML    = "Min Temperature: " + newInformation.temp_min + "&degC";
        document.getElementById("feels_like").innerHTML  = "Feels Like: " + newInformation.feels_like + "&degC";
        document.getElementById("speed").innerHTML       = "Wind Speed: " + newInformation.speed;
        document.getElementById("main").innerHTML        = "Main: " + newInformation.main;
        document.getElementById("description").innerHTML = "Description: " + newInformation.description;
        document.getElementById("content").innerHTML     = "Your Feeling: " + newInformation.theFeelings;
    } catch (error) {
        // Catch the error and display it in the console
        // handle an error
        console.log(error);
    }
}







/**
 * 
 * References
 * 
 * OpenWeatherMap. (n.d.). Current weather data. OpenWeatherMap. Retrieved March 14, 2022, from https://openweathermap.org/current#zip 
 * Udacity. (n.d.). Understanding Server &amp; Client Side Code. Udacity. Retrieved March 14, 2022, from https://classroom.udacity.com/nanodegrees/nd0011-fwd-t2/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/3726b76d-b5c9-4c51-b945-7f1a611a2cb4 
 * 
 */
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "f523c8840d0cad70c4c034eaed71e1c4";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
       try {
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData);
       } catch (error) {
        console.error(error);
        displayError(error);
       }
    } else {
        displayError("type in a valid city")
    }

})

async function getWeatherData(city) {
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("could not fetch weather data")
    } 
    return response.json();

}

function displayWeatherInfo(data) {
    console.log(data);
const {name: city, main: {temp, humidity}, weather:[{id, description}]} = data;
 

card.textContent = "";
card.style.display = "flex";


const cityDisplay = document.createElement("h1");
cityDisplay.classList.add("cityDisplay");
cityDisplay.textContent = city;

const tempDisplay = document.createElement("p");
tempDisplay.classList.add("tempDisplay");
tempDisplay.textContent = `${(temp - 273).toFixed(1)}°C`;

const humidityDisplay = document.createElement("p");
humidityDisplay.classList.add("humidityDisplay");
humidityDisplay.textContent = `Humidity:${humidity}%`

const descDisplay = document.createElement("h1");
descDisplay.classList.add("descDisplay");
descDisplay.textContent = description;


const weatherEmoji = document.createElement("p");
weatherEmoji.classList.add("weatherEmoji");
weatherEmoji.textContent = getWeatherEmoji(id)


card.appendChild(cityDisplay);
card.appendChild(tempDisplay);
card.appendChild(humidityDisplay);
card.appendChild(descDisplay);
card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
if (weatherId >= 800 && weatherId < 900) {
    return "☁️"
} else if (weatherId >= 500  && weatherId < 600) {
    return "🌧️"
} else if (weatherId == 800) {
    return "☀️"
}
}

function displayError(message) {
const errorDisplay = document.createElement("p");
errorDisplay.textContent = message;
errorDisplay.classList.add("errorDisplay");

card.textContent = "";
card.style.display ="flex"
card.appendChild(errorDisplay);

}










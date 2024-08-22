var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');

var apik = "c65cd8e185c3b2afe1227cab16458a7d";

// Function to convert temperature from Kelvin to Celsius
function conversion(intval) {
    return (intval - 273.15).toFixed(2);
}

btn.addEventListener('click', function() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apik)
        .then(res => res.json())
        .then(data => {
            if (data.cod === 200) { // Check if the city was found
                var nameval = data['name'];
                var descrip = data['weather'][0]['description'];
                var temperature = data['main']['temp'];
                var windspeed = data['wind']['speed'];

                city.innerHTML = `Weather of <span>${nameval}</span>`;
                temp.innerHTML = `Temperature: <span>${conversion(temperature)} °C</span>`;
                description.innerHTML = `Sky conditions: <span>${descrip}</span>`;
                wind.innerHTML = `Wind speed: <span>${windspeed} km/h</span>`;
            } else {
                throw new Error('City not found');
            }
        })
        .catch(err => alert('You entered a wrong city name or there was an error with the request.'));
});

const app = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

//default city upon page load
let cityInput = "Nairobi";


//click events to panel cities

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        //change from default city to clicked one
        cityInput = e.target.innerHTML;

        fetchWeatherData();

        app.getElementsByClassName.opacity = "0";

    })
})

//submit event

form.addEventListener('submit', (e) =>{

//if input empty, error

if (search.value.length == 0) {
    alert('NO CITY NAME INPUT');

} else {
    //change from default to input city
    cityInput = search.value

    fetchWeatherData();

    search.value = "";

    app.getElementsByClassName.opacity = 0;

}

//prevent default behavior of form

e.preventDefault();
});

function dayOfTheWeek(day,month,year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    
    ];

    return weekday[new Date('${day}/${month}/${year}').getDay()];

};

function fetchWeatherData() {
    fetch('http://api.weatherapi.com/v1/current.json?key=d47b4f9a91344fe6aa082305222212&q=${cityInput}')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}


TimePicker.innerHTML = data.current.temp_c + "&#176;";
conditionOutput.innerHTML = data.current.condition.text;

//Extract Time and date from the response
const date = data.location.localtime;
const y = parseInt(date.substra(0,4));
const m = parseInt(data.substr(5,2));
const d =  parseInt(date.substr(8,2));
const time = date.substr(11);

//reformat Date/Time data
dateOutput.innerHTML = '${dayOfTheWeek(d,m,y)} ${d}, &{m} ${y}';
timeOutput.innerHTML = time;
nameOutput.innerHTML = date.location.name;
//Icon URL ya weather
const iconId = data.current.condition.icon.substr(
    "//cdn.weatherapi.com/weather/64x64/".length);
//convert it into local file
    icon.src = "./icons/" +iconId;

//add weather detail kwa page
cloudOutput.innerHTML = data.current.cloud + "%";
humidityOutput.innerHTML = data.current.humidity + "%";
windOutput.innerHTML = data.current.windkph + "km/h";

//default time of day

let timeOfDay = "day";
//id each weather condition

const code = data.current.condition.code;

//change to night

if (!data.current.is_day) {
    timeOfDay = "night";

}

if (code == 1000) {
    //set BG to clear if weather is clear

    app.style.backgroundImage = 
    `url(.images/${timeOfDay}/clear.jpg)`
}

app.lastElementChild.backgroundImage = 'url(./images/${timeOfDay}/cloudy.jpg)';

btn.style.background = "#e5ba92";

let weatherObj = {
    apiKey: "325ae071e5b172e526ea622fdf06ca9d",
    getWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)

        .then(response => response.json())

        .then(data => {
            this.displayWeather(data);
            document.querySelector('.general').classList.add('active');
            document.querySelector('.intro').classList.add('active');
        })
        .catch(err => {
            document.querySelector('.error').innerText = 'City Not Found, Please Enter Correct City Name';
            setTimeout(() => {
                document.querySelector('.error').innerText = "";
            }, 5000)
        })
        
    },
    displayWeather: function(weatherInfo) {
        
        const {icon, main, description} = weatherInfo.weather[0];
        const {name} = weatherInfo;
        const {temp, temp_min, temp_max, pressure, humidity} = weatherInfo.main;
        const {speed} = weatherInfo.wind;
        const {lon, lat} = weatherInfo.coord;
        const {country} = weatherInfo.sys;
        const {all} = weatherInfo.clouds



        const utcSec = parseInt(weatherInfo.dt, 10) + parseInt(weatherInfo.timezone, 10) //converting dt and timezone values to integers
        const utcMilSec = (utcSec * 1000) //converting to milliseconds

        const date = new Date(utcMilSec).toUTCString();// getting exact UTC time value of user input
        
        const currentDate = new Date(date);
        currentDate.setUTCHours(currentDate.getUTCHours() - 1) //reducing the hour of the UTC date value by 1hr

        const dayOfWeek = currentDate.toLocaleDateString(); //getting current date
        const timeOfDay = currentDate.toLocaleTimeString(); //getting exact time of location
        const currentDay = currentDate.getDay()
    
        const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
        const currentDayOfWeek = daysOfTheWeek[currentDay] //getting name of current day
        
        
        
        document.querySelector('.col1').innerHTML = `<div class="city-name">
                
                <p>${name}, <span style="opacity: .8;">${country}.</span></p>
            </div>
            <div class="temp">
                <h2>${temp}&deg C</h2>
                <div class="range">
                    <p>Low:<span>${temp_min}&degC</span></p>
                    <p>High:<span>${temp_max}&degC</span></p>
                </div>
            </div>`

        document.querySelector('.col2').innerHTML = `<div class="icon">
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png">
            </div>

            <div class="cloud">
                    <h2>${main}</h2>
                    <span>${description}</span>
            </div>
            <div class="date">
                <h2>${currentDayOfWeek}</h2>
                <p>${dayOfWeek}</p>
            </div>
            <div class="time">
                <h2>${timeOfDay}</h2>
            </div>`


        document.querySelector('.col3').innerHTML = `<div class="main">
                <p><span><i class="fa-solid fa-smog"></i></span> Humidity</p>
                <h3 class="value">${humidity}%</h3>
            </div>

            <div class="main">
                <p><span><i class="fa-solid fa-wind"></i></span> Wind Speed</p>
                <h3 class="value">${speed}km/h</h3>
            </div>

            <div class="main">
                <p><span><i class="fa-solid fa-cloud-rain"></i></span> Cloudiness</p>
                <h3 class="value">${all}%</h3>
                </div>
                <div class="main">
                <p><span><i class="fa-solid fa-cloud-showers-heavy"></i></span> Pressure</p>
                <h3 class="value">${pressure} hPa</h3>
            </div>

            <div class="main">
                <p><span><i class="fa-solid fa-compass-drafting"></i></span>Coordinates</p>
                <div class="range">
                    <p>Lat: <span>${lat}</span></p>
                    <p>Lon: <span>${lon}</span></p>
                </div>
            </div>`

    }, 



    getForecast:    function(cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${this.apiKey}`)

        .then(response => response.json())

        .then(data => {
            this.displayForecast(data);
        })
    },


    displayForecast: function (forecastInfo) {
        const forecast = forecastInfo.list
        // console.log(forecast);
    
        document.querySelector('.week').innerHTML = forecast.map((info) => {
            const {dt} = info
            const {temp, feels_like} = info.main
            const utcTime = (dt + 3600) * 1000;
            const date = new Date(utcTime).toUTCString();
            const current = new Date(date)
            current.setUTCHours(current.getUTCHours() - 1);
    
            const currentTime = current.toLocaleTimeString()
            const currentDate = current.toLocaleDateString()
            const currentDay = current.getDay()
    
            const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
            const currentWeek = daysOfTheWeek[currentDay]
       
    
            return `<div class="day">
            <p>${currentWeek}</p> 
            <p>${currentDate}</p> 
            <p>${currentTime}</p> 
            <div class="temp">
                 <h2>${temp}&deg C</h2>
             </div>
             <h3>Real feels</h3>
             <span>${feels_like}&deg</span>
         </div>`
        });
        
    },




    search: function() {
        this.getForecast(document.querySelector('.searchBar').value)
        this.getWeather(document.querySelector('.searchBar').value)
    }
}

 
let searchBtn = document.querySelector('.fa-search')
searchBtn.addEventListener('click', () => {
    weatherObj.search();
})


const date = new Date();
const day = date.getDay();
    const daysOfWeek = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"]
    const currentDayOfWeek = daysOfWeek[day]
    document.querySelector('.today').innerHTML = `<h1>${currentDayOfWeek}</h1>`
    const dayOfWeek = date.toLocaleDateString();
    document.querySelector('.dates').innerHTML = `<h2>${dayOfWeek}</h2>`
setInterval(() => {
    const date = new Date();
    const timeOfDay = date.toLocaleTimeString();
    document.querySelector('.times').innerHTML = `<h2>${timeOfDay}</h2>`
    

}, 1000);

ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2500,
    delay: 200,
    speed: 800
  });
  ScrollReveal().reveal('.texts p', { delay: 800, origin: 'bottom' });
  ScrollReveal().reveal('.texts h1', { delay: 600, origin: 'bottom' });
  ScrollReveal().reveal('.fa-solid', { delay: 400, origin: 'top' });
  ScrollReveal().reveal('.texts h2', { delay: 700, origin: 'bottom' });


let days = document.querySelectorAll('.day');

days.forEach((day) => {
    day.addEventListener('click', ()=>{
        document.querySelector('.week .active').classList.remove('active');
        day.classList.add('active');
    })
})
    





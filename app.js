const weatherObj = {
    apiKey: "325ae071e5b172e526ea622fdf06ca9d",

    getWeather: async function (city) {
        document.querySelector('.loading-msg').innerText = "Loading..."
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)

        .then(response => response.json())

        .then(data => {
            this.displayWeather(data);
            document.querySelector('.general').classList.add('active');
            document.querySelector('.intro').classList.add('active');
        })
        .catch(err => {
            // console.log(err)
            document.querySelector('.error').innerText = "City Not Found, Please Enter A Correct City Name.";
            setTimeout(() => {
                document.querySelector('.error').innerText  = ""
            }, 5000)
        })

        .finally(() => {
            document.querySelector('.loading-msg').innerText = ""
        })
        
    },
    displayWeather: function(weatherInfo) {
        
        //desctructuring properties of data object resolved
        const {icon, main, description} = weatherInfo.weather[0];
        const {name} = weatherInfo;
        const {temp, temp_min, temp_max, pressure, humidity} = weatherInfo.main;
        const {speed} = weatherInfo.wind;
        const {lon, lat} = weatherInfo.coord;
        const {country, sunrise, sunset} = weatherInfo.sys;
        const {all} = weatherInfo.clouds


        //calculating city time and date
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
        
        //calculating sunrise time
        const utcSunrise = (sunrise + 3600) * 1000

        const sunriseDate = new Date(utcSunrise).toUTCString();
        const citySunriseTime = new Date(sunriseDate)
        citySunriseTime.setUTCHours(citySunriseTime.getUTCHours() - 1)

        const sunriseTime = citySunriseTime.toLocaleTimeString();


        //calculating sunset time
        const utcSunset = (sunset + 3600) * 1000;

        const sunsetDate = new Date(utcSunset).toUTCString();
        const citySunsetTime = new Date(sunsetDate);
        citySunsetTime.setUTCHours(citySunsetTime.getUTCHours() - 1);

        const sunsetTime = citySunsetTime.toLocaleTimeString();


        
        document.querySelector('.col1').innerHTML = `<div class="city-name">
                <p>${name}, <span style="opacity: .8;">${country}.</span></p>
                <div class="range">
                    <p>Sunrise: ${sunriseTime}</span></p>
                    <p>Sunset: ${sunsetTime}</span></p>
                </div>
            </div>
            <div class="temp">
                <h2>${temp}&deg C</h2>
                <div class="range">
                    <p>Low:<span> ${temp_min}&degC</span></p>
                    <p>High:<span> ${temp_max}&degC</span></p>
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



    getForecast: async function(cityName) {
        await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${this.apiKey}`)

        .then(response => response.json())

        .then(data => {
            this.displayForecast(data);

            document.querySelector('.error').innerText = ''
            document.querySelector('.load .fa-rotate-right').classList.add('active');
        })
    },


    displayForecast: function (forecastInfo) {
        const forecast = forecastInfo.list
    
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
                 <h2>${temp}&deg</h2>
             </div>
             <h3>Real feels</h3>
             <span>${feels_like}&deg</span>
         </div>`
        }).join(''); 
    },


    search: function(searchValue) {
        
        if(searchValue === ""){
            document.querySelector('.error').innerText = 'Please enter a city'
            
            setTimeout(() => {
                document.querySelector('.error').innerText = ''
            }, 3000);
            return;
        }
        else{
            this.getForecast(document.querySelector('.searchBar').value)
           this.getWeather(document.querySelector('.searchBar').value)
        }
        
    }
}
const searchBar = document.querySelector('.searchBar');
const refreshBtn = document.querySelector('.refresh');
const searchBtn = document.querySelector('.fa-search')

//search icon function
searchBtn.addEventListener('click', () => {
    weatherObj.search(searchBar.value);
})

//refresh icon function
refreshBtn.addEventListener('click', () => {
    weatherObj.search(searchBar.value);
})

//enter key function
searchBar.addEventListener('change', () => {
    weatherObj.search(searchBar.value);
})

//displaying local date and time on start up page
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


//scroll function for arrow buttons

document.querySelector('.btnLeft').addEventListener('click', () => {
    document.querySelector('.week').scrollLeft -= 150
})

document.querySelector('.btnRight').addEventListener('click', () => {
    document.querySelector('.week').scrollLeft += 150
})
 

ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2500,
    delay: 200,
    speed: 800
  });
  ScrollReveal().reveal('.texts p', { delay: 800, origin: 'bottom' });
  ScrollReveal().reveal('.texts h1', { delay: 600, origin: 'bottom' });
  ScrollReveal().reveal('.fa-poo-storm', { delay: 400, origin: 'top' });
  ScrollReveal().reveal('.texts h2', { delay: 700, origin: 'bottom' });





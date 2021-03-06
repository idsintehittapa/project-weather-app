/// getting the API for todays weather
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Longyearbyen,Norway&units=metric&APPID=8990d7a0fe5c73c6c0fe06bb994b1035"
fetch(apiUrl).then((response) => {
    return response.json()
})
    .then((weatherMain) => {
        generatedHTMLForWeatherToday(weatherMain)
    })


/// getting the API for weather forecast
const apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Longyearbyen,Norway&units=metric&APPID=8990d7a0fe5c73c6c0fe06bb994b1035"

fetch(apiUrlForecast).then((response) => {
    return response.json()
})
    .then((weatherForecast) => {
        const filteredForecast = weatherForecast.list.filter(item =>
            item.dt_txt.includes('12:00'))
        filteredForecast.forEach((forecast, idx) => {
            generatedHTMLForWeatherForecast(forecast, idx)
        })
    })

/// calculating a rounded number for the temp
const roundtemp = (number) => {
    const roundtemp = Math.round(number * 10) / 10
    return roundtemp
}

/// calculating the time into readable format
const readableTime = (time) => {
    const readableTime = new Date(time * 1000)
    const sunTimeString = readableTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })
    return sunTimeString
}

/// calculating the date into readable format
const readableDate = (date) => {
    const readableDate = new Date(date * 1000)
    const dateReadableDate = readableDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: "numeric",
    })
    return dateReadableDate
}

/// getting icon related to weather
const weatherIcon = {
    "Clear": "https://openweathermap.org/img/wn/01d@2x.png",
    "Clouds": "https://openweathermap.org/img/wn/03d@2x.png",
    "Drizzle": "https://openweathermap.org/img/wn/09d@2x.png",
    "Fog": "https://openweathermap.org/img/wn/50d@2x.png",
    "Haze": "https://openweathermap.org/img/wn/50d@2x.png",
    "Mist": "https://openweathermap.org/img/wn/50d@2x.png",
    "Rain": "https://openweathermap.org/img/wn/10d@2x.png",
    "Smoke": "https://openweathermap.org/img/wn/50d@2x.png",
    "Snow": "https://openweathermap.org/img/wn/13d@2x.png",
    "Squall": "https://openweathermap.org/img/wn/50d@2x.png",
    "Thunderstorm": "https://openweathermap.org/img/wn/11d@2x.png",
    "Tornado": "https://openweathermap.org/img/wn/50d@2x.png",
}

/// getting background color related to weather
let weatherColor = {
    "Clear": "linear-gradient(to right, #ededa9, #fdbb2d)",
    "Clouds": "linear-gradient(to right, #989898, #bdc3c7)",
    "Drizzle": "linear-gradient(to right, #D0E1E6, #8CAEAB)",
    "Fog": "linear-gradient(to right, #DECBA4, #bdc3c7)",
    "Haze": "linear-gradient(to right, #DECBA4, #bdc3c7)",
    "Mist": "linear-gradient(to right, #DECBA4, #bdc3c7)",
    "Rain": "linear-gradient(to right, #737376, #777b88)",
    "Smoke": "linear-gradient(to right, #918f72, #525252)",
    "Snow": "linear-gradient(to right, #6dd5ed, #076585)",
    "Squall": "linear-gradient(to right, #DCDBDF, #bdc3c7)",
    "Thunderstorm": "linear-gradient(to right, #3E5151, #DECBA4, #3E5151)",
    "Tornado": "linear-gradient(to right, #3E5151, #DECBA4, #3E5151)",
}


/// Displaying todays weather forecast 
const generatedHTMLForWeatherToday = (weatherMain) => {
    const weather = weatherMain.weather[0].main
    document.getElementById('weatherMain').innerHTML = weatherMain.weather[0].main
    document.getElementById('backgroundColor').style.background = weatherColor[weather]
    document.getElementById('weatherImage').src = weatherIcon[weather]
    document.getElementById('weatherTemp').innerHTML = `${roundtemp(weatherMain.main.temp)}&deg;`
    document.getElementById('weatherTempFeel').innerHTML = roundtemp(weatherMain.main.feels_like)
    document.getElementById('weatherDescription').innerHTML = weatherMain.weather[0].description
    document.getElementById('sunrise').innerHTML = readableTime(weatherMain.sys.sunrise)
    document.getElementById('sunset').innerHTML = readableTime(weatherMain.sys.sunset)
}

/// Display weather forecast
const generatedHTMLForWeatherForecast = (forecast, idx) => {
    document.getElementById('forecastTemp' + idx).innerHTML = `${roundtemp(forecast.main.temp)}&deg;`
    document.getElementById('forecastDate' + idx).innerHTML = readableDate(forecast.dt)
}



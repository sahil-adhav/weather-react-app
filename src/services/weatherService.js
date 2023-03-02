import { DateTime } from "luxon";
const API_KEY = "89e3a3417684ab5eec42f6ef99341d22";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams(
        {...searchParams, appid:API_KEY}
    );

    return fetch(url)
        .then((res) => res.json())
}

const formatCurrentWeather = (data) => {
    const {
        coord: {lon, lat},
        main:{temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        weather,
        sys: {country, sunrise, sunset},
        wind: {speed}
    } = data;

    const {main : details, icon} = weather[0];

    return {lon, lat, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, speed, details, icon}
}

const formatForecastWeather = (data) => {
    let {timezone, daily, hourly} = data;
    
    daily = daily.slice(1,6).map((d) => {
        return {
            title : formatToLocalTime(d.dt, timezone, 'ccc'),
            temp : d.temp.day,
            icon : d.weather[0].icon
        }
    });

    hourly = hourly.slice(1,6).map((d) => {
        return {
            title : formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp : d.temp,
            icon : d.weather[0].icon
        }
    });
    console.log(daily);
    return  {timezone, daily, hourly}
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);

    const {lat, lon} = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", {
        lat,
        lon,
        excludes: "current, minutely, alerts",
        units : searchParams.units
    }).then(formatForecastWeather)

    return {
        ...formattedCurrentWeather, 
        ...formattedForecastWeather
    };
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode};
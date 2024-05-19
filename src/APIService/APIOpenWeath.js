// import { DateTime } from "luxon";

// const API_KEY = "50a28d81027ac13eded76c9b1fb00b69"; // Replace with your actual API key
// const CURRENT_WEATHER_ENDPOINT =
//   "https://api.openweathermap.org/data/2.5/weather";

// async function getWeatherData(searchParams) {
//   try {
//     const url = new URL(CURRENT_WEATHER_ENDPOINT);
//     url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

//     const response = await fetch(url);

//     if (!response.ok) {
//       const errorData = await response.json(); // Try to get error details
//       throw new Error(errorData.message || "Weather data not available");
//     }

//     return response.json();
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//     throw error; // Re-throw the error to handle it in your component
//   }
// }
// const iconurl=(icon) => `http://openweathermap.org/img/wn/${icon}@2x`;
// const formatLocalTime = (
//   secs,
//   offset,
//   format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
// ) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);
// const structurecurrent = (data) => {
//   console.log(data);
//   const {
//     coord: { lat, lon },
//     main: { temp, feels_like, temp_min, temp_max, humidity },
//     name,
//     dt,
//     sys: { country, sunrise, sunset },
//     weather,
//     wind: { speed },
//     timezone,
//   } = data;
//   const { main: details, icon } = weather[0];
//   const formattedLocalTime = formatLocalTime(dt, timezone);
//   return {
//     lat,
//     lon,
//     temp,
//     feels_like,
//     temp_max,
//     temp_min,
//     humidity,
//     name,
//     country,
//     sunrise: formattedLocalTime(sunrise, timezone, "hh:mm a"),
//     sunset: formattedLocalTime(sunset, timezone, "hh:mm a"),
//     speed,
//     details,
//     icon:iconurl(icon),
//     formattedLocalTime,
//   };
// };
// const getstructeddetails = async (searchParams) => {
//   const structureddetails = await getWeatherData(searchParams)
//   .then(structurecurrent);
//   return { ...structureddetails};
// };

// export default getstructeddetails;
// import { DateTime } from "luxon";

// const API_KEY = "50a28d81027ac13eded76c9b1fb00b69";
// const CURRENT_WEATHER_ENDPOINT = "https://api.openweathermap.org/data/2.5/";

// const iconurl=(icon) => `http://openweathermap.org/img/wn/${icon}@2x`;
// async function getWeatherData(searchtype,searchParams) {
//   try {
//     const url = new URL(CURRENT_WEATHER_ENDPOINT+searchtype);
//     url.search = new URLSearchParams({...searchParams, appid: API_KEY });

//     const response = await fetch(url);

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Weather data not available");
//     }

//     return response.json();
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//     throw error;
//   }
// }
// const formatLocalTime = (
//     secs,
//     offset,
//     format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
//   ) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);
// const structureCurrentWeather = (data,formatLocalTime) => { // Renamed for clarity
//   const {
//     coord: { lat, lon },
//     main: { temp, feels_like, temp_min, temp_max, humidity },
//     name,
//     dt,
//     sys: { country, sunrise, sunset },
//     weather,
//     wind: { speed },
//     timezone,
//   } = data;

//   const { main: details, icon } = weather[0];

//   return {
//     lat,
//     lon,
//     temp,
//     feels_like,
//     temp_max,
//     temp_min,
//     humidity,
//     name,
//     country,
//     sunrise: formatLocalTime(sunrise, timezone, "hh:mm a"),
//     sunset: formatLocalTime(sunset, timezone, "hh:mm a"),
//     speed,
//     details,
//     icon: iconurl(icon),
//     formattedLocalTime:formatLocalTime(dt, timezone),
//     dt,
//     timezone
//   };
// };
// const formatForeCastWeather= (secs,offset,data)=>{
//     // const hourly=data
//     // .filter((f)=>f.dt > secs)
//     // {

//     // }
//     return {hourly};
// }
// const getStructuredWeatherDetails = async (searchParams) => { // Renamed for clarity
//   const formattedData = await getWeatherData("weather",searchParams).then((d)=>{structureCurrentWeather(d,formatLocalTime)});
//     console.log(formattedData);
//   const {dt,lat,lon,timezone} = formattedData;
//   const formattedForecast= await getWeatherData("forecast",{
//     lat,lon,
//     units:searchParams.units,
//   }).then((d)=>{
//     formatForeCastWeather(dt,timezone,d.list)
//   })
//   return {...formattedData,...formattedForecast};
// };

// export default getStructuredWeatherDetails;

import { DateTime } from "luxon";

const API_KEY = "50a28d81027ac13eded76c9b1fb00b69";
const CURRENT_WEATHER_ENDPOINT = "https://api.openweathermap.org/data/2.5/";

const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

async function getWeatherData(searchType, searchParams) {
  try {
    const url = new URL(CURRENT_WEATHER_ENDPOINT + searchType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Weather data not available");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

const formatLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a'"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const structureCurrentWeather = (data, formatLocalTime) => {
  // ... (same as before)
  //   console.log(data);
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    country,
    sunrise: formatLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrl(icon),
    formattedLocalTime: formatLocalTime(dt, timezone),
    dt,
    timezone,
  };
};

// const formatForecastWeather = (secs, offset, data) => {
//   const hourly = data
//     // .filter((f) => f.dt > secs) // Filter future forecasts
//     .map((f) => ({
//       temp: f.main.temp,
//       title: formatLocalTime(f.dt, offset, "hh:mm a"),
//       icon: iconUrl(f.weather[0].icon),
//       date: f.dt_txt,
//     }))
//     .slice(0, 5);
//   const daily = data
//     .filter((f) => f.dt_txt.slize(0, 8) === "00:00:00")
//     .map((f) => ({
//       temp: f.main.temp,
//       title: formatLocalTime(f.dt, offset, "hh:mm a"),
//       icon: iconUrl(f.weather[0].icon),
//       date: f.dt_txt,
//     }));
//   // Take only the next 8 hours (or adjust as needed)
//   return { hourly, daily };
// };
const formatForecastWeather = (secs, offset, data) => {
    // Check if data.list exists (it's the array you need to map over)
    if (!data || !data.list || !Array.isArray(data.list)) {
      throw new Error('Invalid forecast data format');
    }
  
    const hourly = data.list
      .filter((f) => f.dt > secs) // Filter future forecasts
      .map((f) => ({
        temp: f.main.temp,
        title: formatLocalTime(f.dt, offset, "hh:mm a"),
        icon: iconUrl(f.weather[0].icon),
        date: f.dt_txt,
      }))
      .slice(0, 5); // Take the next 5 hours
    const daily=data.list
    .filter((f)=> f.dt_txt.slice(-8) === "12:00:00").map(f =>
        ({
            temp: f.main.temp,
        title: formatLocalTime(f.dt, offset, "ccc"),
        icon: iconUrl(f.weather[0].icon),
        date: f.dt_txt,
        })
    )


    // Get unique dates for daily forecasts
//     const uniqueDates = [...new Set(data.list.map(item => item.dt_txt.slice(0, 10)))];
//     // console.log(uniqueDates);
//     const daily = uniqueDates.map((date) => {
//       const forecastForDate = data.list.find(item => item.dt_txt.startsWith(date));
//     //   console.log(forecastForDate.dt);
//       return {
//         temp: forecastForDate.main.temp,
//         title: formatLocalTime(forecastForDate.dt, offset, "EEE"),
//  // Use 3-letter weekday for daily
//         icon: iconUrl(forecastForDate.weather[0].icon),
//         date,
//       };
//     });
    
  
    return { hourly, daily };
  };

const getStructuredWeatherDetails = async (searchParams) => {
  const formattedCurrentData = await getWeatherData(
    "weather",
    searchParams
  ).then((data) => structureCurrentWeather(data, formatLocalTime));
  //   console.log(formattedCurrentData);
  const { dt, lat, lon, timezone } = formattedCurrentData;
  //   console.log(dt);
  //   console.log(lon);
  //   console.log(lon);
  //   console.log(timezone);

  const formattedForecast = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((data) => {
    return formatForecastWeather(dt, timezone, data);
  });

  console.log(formattedCurrentData);
  console.log(formattedForecast);
  return { ...formattedCurrentData, ...formattedForecast };
};

export default getStructuredWeatherDetails;

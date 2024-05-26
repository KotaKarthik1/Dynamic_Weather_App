import React, { useEffect, useState } from "react";
import EnterCity from "./Components/EnterCity";
import DateLocality from "./Components/DateLocality";
import ClimateDetails from "./Components/ClimateDetails";
import getStructuredWeatherDetails from "./APIService/APIOpenWeath";
import ForecastHours from "./Components/ForecastHours";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line } from "recharts";
import ReactPlayer from "react-player";

// Define video sources for different weather conditions
const weatherVideos = {
  Rain: "/videos/rain_shud.mp4",
  Sunny: "/videos/sunny.mp4",
  // snow: "path/to/snow.mp4",
  Clear: "/videos/clear.mp4",
  Clouds: "/videos/cloudy.mp4",
  // ... add more conditions as needed
};

// Function to handle the API errors
function App() {
  const [searchParams, setSearchParams] = useState({ q: "Hyderabad" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  
  const [notFoundError, setNotFoundError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getStructuredWeatherDetails({
          ...searchParams,
          units,
        });
        setWeather(data);
        setNotFoundError(null); // Clear any previous error when data is fetched successfully.
      } catch (error) {
        console.error(error);
        // Check if the error is due to city not found
        if (
          error.message.includes("city not found") ||
          error.message.includes("Weather data not available")
        ) {
          setNotFoundError(error.message); // Set the error message to display
          setWeather(null); // Clear weather data if the city is not found
        } else {
          // Handle other types of errors (e.g., network errors)
        }
      }
    };

    fetchWeatherData();
  }, [searchParams, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const climatetype = weather.details;
    console.log(climatetype);
    if (climatetype == "Rain") return "from-blue-800 via-blue-600 to-gray-700";
    if (climatetype == "Sunny")
      return "from-yellow-400 via-orange-500 to-red-500";
    if (climatetype == "Clouds")
      return "from-gray-400 via-gray-600 to-gray-400";
    if (climatetype == "Clear") return "from-blue-500 to-sky-200";
    if (climatetype == "Snow")
      return "from-blue-300 via-blue-100 to-blue-200";
    if (climatetype == "Drizzle")
      return "from-gray-200 via-gray-300 to-blue-400";
    return "from-blue-800 via-blue-600 to-gray-700";
  };

  return (
    <div className={`relative w-full h-screen`}>
      <ReactPlayer
        url={weatherVideos[weather?.details] || weatherVideos.Clouds}
        playing={true} // Auto-play the video
        loop={true} // Loop the video
        muted={true} // Mute the video
        width="100%" // Set the width to 100%
        height="100%" // Set the height to 100%
        style={{ position: "absolute", top: 0, left: 0, objectFit: "cover", zIndex: -1 }}
      />
      <div className={`bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()} p-10 md:p-20 mx-auto w-full`}>
        <p className="text-4xl md:text-7xl font-bold text-white mb-6 md:mb-10 text-center">
          Weather Dashboard
        </p>
        <EnterCity setSearchParams={setSearchParams} setUnits={setUnits} />
        {!weather && notFoundError ? (
          <div className="flex flex-row items-center justify-center">
            <p className="text-3xl p-5 m-5">No city found</p>
          </div>
        ) : (
          weather && (
            <>
              <DateLocality weather={weather} units={units} />
              <ClimateDetails weather={weather} units={units} />
              <ForecastHours data={weather.hourly} units={units} />
            
              
                <div className="mt-4">
                  <div className="flex flex-col md:flex-row gap-4 p-4">
                    <div className="bg-white rounded-lg shadow-md p-1 flex-1">
                      <h2 className="text-lg font-semibold mb-2">Daily Forecast</h2>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weather.daily}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="title" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="temp" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-1 flex-1">
                      <h2 className="text-lg font-semibold mb-2">Hourly Forecast</h2>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weather.hourly}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="title" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              
            </>
          )
        )}
      </div>
    </div>
  );
}

export default App;

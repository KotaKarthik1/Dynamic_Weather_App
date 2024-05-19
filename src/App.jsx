// App.jsx

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
import {
  LineChart,
  Line,
  
} from "recharts";
// Define video sources for different weather conditions
const weatherVideos = {
  Rain: "/videos/rain_shud.mp4",
  Sunny: "/videos/sunny.mp4",
  // snow: "path/to/snow.mp4",
  Clear: "/videos/clear.mp4",
  Clouds: "/videos/cloudy.mp4",
  // ... add more conditions as needed
};

function App() {
  const [searchParams, setSearchParams] = useState({ q: "guntur" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getStructuredWeatherDetails({
          ...searchParams,
          units,
        });
        setWeather(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        // Handle the error (e.g., show an error message to the user)
      }
    };

    fetchWeatherData();
  }, [searchParams, units]); // Add units to the dependency array

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
    if (climatetype == "Snow") return "from-blue-300 via-blue-100 to-blue-200";
    if (climatetype == "Drizzle")
      return "from-gray-200 via-gray-300 to-blue-400";
    return "from-blue-800 via-blue-600 to-gray-700";
  };
  const [showFullForecast, setShowFullForecast] = useState(false); 

  return (
    <div
      className={`bg-gradient-to-br shadow-xl shadow-gray-400
      ${formatBackground()}  p-10 md:p-20 mx-auto w-full `}
    >
      {/* Adjust width and padding */}
      <p className="text-4xl md:text-7xl font-bold text-white-400 text-white mb-6 md:mb-10 text-center">
        {/* Center text, adjust margins and size */}
        Weather Dashboard
      </p>
              <EnterCity
                setSearchParams={setSearchParams}
                setUnits={setUnits}
              />
              {weather && (
                <>
                  <DateLocality weather={weather} units={units} />{" "}
                  {/*Pass units to DateLocality */}
                  <ClimateDetails weather={weather} units={units} />{" "}
                  {/*Pass units to ClimateDetails */}
                  <ForecastHours data={weather.hourly} units={units} />{" "}
                  {/*Pass units to ForecastHours */}
                  <div className="flex flex-row items-center justify-center">
                    <button
                      type="button"
                      className="m-6 bg-white text-black  border
                      focus:ring-5 focus:outline-none focus:ring-white-300 font-medium 
                       rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                       onClick={() => setShowFullForecast(!showFullForecast)}
                    >
                     
                        View Full Forecast
                      
                    </button>
                  </div>
                </>
              )}
          {showFullForecast && ( 
            <div className="flex flex-col md:flex-row gap-4 p-4"> {/* Added flexbox layout */}

            {/* Daily Forecast Bar Chart */}
            <div className="bg-white rounded-lg shadow-md p-4 flex-1">
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
      
            {/* Hourly Forecast Line Chart */}
            <div className="bg-white rounded-lg shadow-md p-4 flex-1">
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
          )}
    </div>
  );
}

export default App;

import React from "react";
import { FaThermometerEmpty, FaWind } from "react-icons/fa";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import "./css/ClimateDetails.css";
export default function ClimateDetails(weather) {
  const {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  } = weather.weather;
  console.log(weather.weather);
  console.log(details);
  const horizontalDetails = [
    {
      id: 1,

      Icon: GiSunrise,

      title: "Sunrise",

      value: sunrise,
    },

    {
      id: 2,

      Icon: GiSunset,

      title: "Sunset",

      value: sunset,
    },
    {
      id: 3,

      Icon: MdKeyboardArrowUp,

      title: "High",

      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,

      Icon: MdKeyboardArrowDown,

      title: "Low",

      value: `${temp_max.toFixed()}°`,
    },
  ];

  const verticalDetails = [
    {
      Icon: FaThermometerEmpty,
      value: `real feel ${feels_like}°`,
    },
    {
      Icon: WiHumidity,
      value: `Humidity ${humidity.toFixed()}%`,
    },
    {
      Icon: FaWind,
      value: `speed ${speed.toFixed()}km/h`,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center py-6">
        <p className=" text-2xl text-white">{details}</p>
      </div>
      <div className="flex flex-row items-center justify-between ">
        <img
          src={icon}
          alt="sun icon"
          className="text-white"
        />
        <p className="text-4xl text-white">{temp}°</p>
        <div className="flex flex-col items-start space-y-2">
          {" "}
          {/* Change items-end to items-start */}
          {verticalDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center space-x-2" // Add space-x-2 for spacing between icon and text
            >
              <detail.Icon size={25} className="text-white" />
              <p className="text-xs md:text-sm font-light text-gray-300">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="flex flex-row items-center justify-center space-x-10 text-sm py-6">
        {horizontalDetails.map((detail) => ( // Removed extra parentheses in the map function
          <div key={detail.id} className="flex flex-row items-center">
            <detail.Icon size={30} className="text-white"/>
            <p className="font-light ml-2 text-white">
              {`${detail.title}: `}
              <span className="font-medium ml-2 text-white">{detail.value}</span>
            </p>
          </div>
        ))}
      </div> */}
      <div className='flex items-center justify-between'>
        {/* <div className="flex flex-row items-center overflow-x-auto scroll-smooth py-6 max-w-[90vw]"> */}
          {horizontalDetails.map((detail) => (
            <div
              key={detail.id}
              // className="flex flex-row items-center min-w-[150px] px-4"
              className='flex flex-col items-center justify-center'
            >
              <detail.Icon size={30} className="text-white " />
              <p className="font-light text-sm text-white">
                {`${detail.title}: `}
                <span className="font-medium  text-white">
                  {detail.value}
                </span>
              </p>
            </div>
          ))}
        {/* </div> */}
      </div>
    </div>
  );
}

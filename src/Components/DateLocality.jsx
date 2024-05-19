import React from 'react'

export default function DateLocality(weather) {
  const {formattedLocalTime,name,country}=weather.weather;
  // console.log(weather.weather);

  return (
    <div>
      
      <div className='flex justify-center items-center my-6 '>
        <p className='text-gray-300'>{formattedLocalTime}</p>
      </div>
      <div className='flex justify-center items-center my-3'>
        <p className='text-3xl font-meduim text-white' ><b>{name},{country}</b></p>
      </div>
      <div className="video-container">
    </div>
    </div>
  )
}

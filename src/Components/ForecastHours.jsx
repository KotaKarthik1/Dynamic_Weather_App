import React from 'react'

function ForecastHours({data}) {
    console.log(data);
  return (
    <div>
      <div className='flex items-center justify-start mt-6'>
        <p className='font-medium uppercase text-gray-300'>3 Hour Forecast</p>
      </div>
      <hr className='my-1'></hr>
      <div className='flex flex-row  items-center justify-between'>
        {
            data.map((d,index)=>
                (
                    <div key={index} className='flex flex-col items-center justify-center'>
                        <p className='font-light text-sm text-white'>{d.title}</p>
                        <img 
                        src={d.icon}
                        alt="weather icon"
                        className='w-12 my-1'
                        />
                        <p className='fomt-medium text-white'>{d.temp.toFixed()}°</p>
                    </div>
                )
            )
        }
      </div>
    </div>
  )
}

export default ForecastHours

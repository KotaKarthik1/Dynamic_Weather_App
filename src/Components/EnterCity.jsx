import React, { useEffect, useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

function EnterCity({setSearchParams,setUnits}) {
  // const [SavedCities, setSavedCities] = useState(["em ro"]);
  const [city,setCity]=useState('');

  // useEffect(() => {
  //   setSavedCities(["karthik"]);
  // }, []);
  const handlesearchbutton =() =>
    {
      if(city!=="") {
        setSearchParams({q:city})
        setCity("");
      };
    }
    useEffect(() => {
      // Request location access immediately when the component mounts
      handlelocationaccess(); 
    }, []); 
    const handlelocationaccess = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setSearchParams({ lat: latitude, lon: longitude });
            setCity("");
          },
          (error) => {
            console.error("Error getting location:", error.code, error.message);
    
            if (error.code === error.PERMISSION_DENIED) {
              // User denied permission - you could show a message asking them to enable it
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              // Location information is unavailable - try again later or offer a fallback
            } else if (error.code === error.TIMEOUT) {
              // The request timed out - try again or offer a fallback
            }
          },
          { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 } // Options for higher accuracy
        );
      } else {
        // Geolocation is not supported - show a message or provide a fallback
        console.error("Geolocation not supported");
      }
    };

  return (
    <div className="flex items-center justify-between"> 
  <div className="flex items-center mb-4 md:mb-0"> {/* Location button */}
    <BiCurrentLocation 
      size={32} 
      className="text-white mr-2 cursor-pointer" 
      onClick={handlelocationaccess}
    />
    <span 
      className="text-white hidden md:inline cursor-pointer" 
      onClick={handlelocationaccess}
    >
      Access location
    </span>
  </div>

  <div className="flex p-2 items-center mb-4 md:mb-0"> {/* Unit buttons */}
    <button className="text-xl  text-white" onClick={() => setUnits("metric")}>°C</button>
    <span className="mx-1 text-xl  text-white">|</span>
    <button className="text-xl  text-white" onClick={() => setUnits("imperial")}>F</button>
  </div>

  <div className="relative w-full md:w-3/4"> {/* Search bar */}
    <input
      value={city}
      onChange={(e) => setCity(e.currentTarget.value)}
      type="text"
      placeholder="Search city"
      className="text-xl focus:outline-none p-2 capitalize w-full pl-10 pr-16"
      style={{ borderRadius: "0.5rem" }}
    />
    <BiSearch 
      size={28} 
      onClick={handlesearchbutton} 
      className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 cursor-pointer" 
    />
  </div>
</div>

  );
}

export default EnterCity;

import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Inputs({setQuery, units, setUnits}) {

  const [city, setCity] = useState("");

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if(units !== selectedUnit) setUnits(selectedUnit);
    console.log(selectedUnit);
  }

  const handleSearchClick = () => {
    if(city !== "") setQuery({q: city});
  }

  const handleLocationClick = () => {
    if(navigator.geolocation){
      toast.info("Fetching Location");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log(lat);
        setQuery({ lat, lon })
      });
    }
  }

  return (
    <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
            <input 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text" 
                placeholder="Search for city"
                className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"

            />
            <SearchIcon size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick}/>
            <LocationOnIcon size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick}/>
        </div>

        <div className="flex flex-row w-1/4 items-center justify-center">
            <button name="metric" className="text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125" onClick={handleUnitChange}>°C</button>
            <p className="text-xl text-white pr-1 pl-2
            " >|</p>
            <button name="imperial" className="text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125" onClick={handleUnitChange}>°F</button>
        </div>
    </div>
  )
}

export default Inputs
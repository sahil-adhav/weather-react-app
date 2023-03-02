import React from 'react';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WbSunny from '@mui/icons-material/WbSunny';
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';


function TemperatureAndDetails({weather : {
  details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone
}}) {
  console.log(details);
  return (
    <div>
        <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
          <p>
            {details}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between text-white py-3">
          <img 
            src={iconUrlFromCode(icon)}
            alt="img"
            className="w-20"
          />
          <p className="text-5xl">{`${temp.toFixed()}°`}</p>

          <div className="flex flex-col space-y-2">
            
            <div className="flex font-light text-sm items-center justify-center">
              <DeviceThermostatIcon size={18} className="mr-1"/>
              Feels like: 
              <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
            </div>

            <div className="flex font-light text-sm items-center justify-center">
              <OpacityIcon size={18} className="mr-1"/>
              Humidity : 
              <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
            </div>

            <div className="flex font-light text-sm items-center justify-center">
              <AirIcon size={18} className="mr-1"/>
              Wind : 
              <span className="font-medium ml-1">{`${speed.toFixed()}km/h`}</span>
            </div>
          
          </div>
        </div>

        <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
           
           <WbSunny />
           <p className="font-light">
              Rise :
              <span className="font-medium ml-1">{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
           </p>
           <p className="font-light text-white">|</p>

           <WbTwilightIcon />
           <p className="font-light">
              Set :
              <span className="font-medium ml-1">{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
           </p>
           <p className="font-light text-white">|</p>

           <WbSunny />
           <p className="font-light">
              High : 
              <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
           </p>
           <p className="font-light text-white">|</p>

           <WbSunny />
           <p className="font-light">
              Low : 
              <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
           </p>
           
        </div>
    </div>
  )
}

export default TemperatureAndDetails
import { useState } from "react"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import CurrentWeather from "./components/cards/CurrentWeather"
import DailyForecat from "./components/cards/DailyForecat"
import HourlyForecast from "./components/cards/HourlyForecast"
import Map from "./components/Map"
import type { Coords } from "./types"


function App() {
    const [coords,setCoords] = useState<Coords>({lat:40,lon:55})

    const onMapClick = (lat:number, lon:number) =>{
     setCoords({lat,lon})
    }

  return (
    <>
    <div className="flex flex-col gap-8" >
    <Map coords={coords} onMapClick={onMapClick} />
    <CurrentWeather coords={coords} />
    <HourlyForecast coords={coords} />
    <DailyForecat   coords={coords} />
    <AdditionalInfo coords={coords} />
    </div>
      </>
  ) 
}

export default App

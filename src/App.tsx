import { useState } from "react"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import CurrentWeather from "./components/cards/CurrentWeather"
import DailyForecat from "./components/cards/DailyForecat"
import HourlyForecast from "./components/cards/HourlyForecast"
import Map from "./components/Map"
import type { Coords } from "./types"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from "./api"


function App() {
    const [coordinates,setCoords] = useState<Coords>({lat:40,lon:55})

    const [location,setLocation] = useState<string>("Habana")

    const {data: geocodeData } = useQuery({
      queryKey: ['geocode', location],
      queryFn: () => getGeocode(location)
    })
    

    const onMapClick = (lat:number, lon:number) =>{
     setCoords({lat,lon})
     setLocation("custom")
    }

    const coords = 
    location === "custom" ? coordinates : { lat: geocodeData?.[0].lat ?? 0 , lon: geocodeData?.[0].lon ?? 0 }

  return (
    <>
    <div className="flex flex-col gap-8" >
    <LocationDropdown location={location} setLocation={setLocation} />
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

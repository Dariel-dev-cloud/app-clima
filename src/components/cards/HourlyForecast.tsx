import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"
import Card from "./Card"
import WeatherIcon from "../WeatherIcon"
import type { Coords } from "../../types"

type Props = {
    coords: Coords
}

export default function HourlyForecast({coords}:Props) {
     const {data} = useSuspenseQuery({
        queryKey: ['weather',coords],
         queryFn: () => getWeather({lat:coords.lat, lon:coords.lon})
        })

  return (
    <Card childrenClassName="flex gap-6 overflow-x-scroll" title="Pronóstico por hora (48 horas)">
         {data.hourly.map((hour) => (
            <div key={hour.dt} className="flex flex-col gap-2 items-center p-2   " >
               <p className="whitespace-nowrap" >{new Date(hour.dt * 1000).toLocaleTimeString('es-ES', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
               })}</p>
               <WeatherIcon src={hour.weather[0].icon}/>
               <p>{Math.round(hour.temp)}°C</p>
            </div>
         ))}
    </Card>
  )
}
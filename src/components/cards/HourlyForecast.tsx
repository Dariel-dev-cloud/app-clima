import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"
import Card from "./Card"
import WeatherIcon from "../WeatherIcon"

export default function HourlyForecast() {
    
    const {data} = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({lat:10, lon:25})
  })

  return (
    <Card childrenClassName="flex gap-6 overflow-x-scroll" title="Pronóstico por hora (48 horas)">
         {data.hourly.map((hour) => (
            <div className="flex flex-col gap-2 items-center p-2   " >
               <p className="whitespace-nowrap" >{new Date(hour.dt * 1000).toLocaleTimeString('es-ES', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
               })}</p>
               <WeatherIcon src={hour.weather[0].icon}/>
               <p>{Math.round(hour.temp)}°F</p>
            </div>
         ))}
    </Card>
  )
}
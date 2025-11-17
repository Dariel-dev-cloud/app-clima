import { WeatherSchema } from "./schemas/wheatherSchema"
const API_KEY = import.meta.env.VITE_API_KEY

export async function getWeather({lat,lon}:{lat:number,lon:number}){
   const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=standard&lang=es&exclude=minutely,alerts&appid=${API_KEY}`)
   const data = await res.json()
   return WeatherSchema.parse(data)
}
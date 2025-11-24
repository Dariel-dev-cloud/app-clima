import { useSuspenseQuery } from '@tanstack/react-query'
import Card from './Card'
import { getWeather } from '../../api'
import Sunrise from '/src/assets/sunrise.svg?react'
import Sunset from "/src/assets/sunset.svg?react"
import Cloud from "/src/assets/cloud.svg?react"
import Uv from "/src/assets/uv.svg?react"
import Wind from "/src/assets/wind.svg?react"
import Pressure from "/src/assets/pressure.svg?react"
import UpArrow from "/src/assets/uparrow.svg?react"
import type { Coords } from '../../types'

type Props = {
    coords: Coords
}

export default function AdditionalInfo({coords}:Props) {
    const {data} = useSuspenseQuery({
        queryKey: ['weather',coords],
         queryFn: () => getWeather({lat:coords.lat, lon:coords.lon})
        })

  return (
   <Card title='Información meteorológica adicional' childrenClassName='grid grid-cols-1 md:grid-cols-2 gap-8' >
       {rows.map(({label,value,Icon}) => (
        <div className='flex justify-between' key={value}>
          <div className='flex gap-4'>
            <span className='text-gray-500'>{label}</span>
            <Icon className='size-8 dark:invert' />
          </div>
            <span>
                <FormatComponent value={value} number={data.current[value]} />
            </span>
          
        </div>
       ))}
   </Card>
  )
}

function FormatComponent({value,number}:{value:string,number:number}) {

if(value === 'sunset' || value === 'sunrise') return new Date(number * 1000).toLocaleTimeString(undefined,{
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true
})

if(value === 'wind_deg') return <UpArrow className='size-8 invert' style={{transform:`rotate(${number}deg)`}} />

    return number

}

const rows = [
  {
    label: "Nubosidad (%)",
    value: "clouds",
    Icon: Cloud,
  },
  {
    label: "Índice UV",
    value: "uvi",
    Icon: Uv,
  },
  {
    label: "Dirección del viento",
    value: "wind_deg",
    Icon: Wind,
  },
  {
    label: "Presión (hPa)",
    value: "pressure",
    Icon: Pressure,
  },
  {
    label: "Amanecer",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Atardecer",
    value: "sunset",
    Icon: Sunset,
  },
] as const
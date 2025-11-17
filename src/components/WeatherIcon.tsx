

type Props = {
  src: string
}

function WeatherIcon({src}: Props) {
  return (
     <img className='size-8'
    src={`https://openweathermap.org/img/wn/${src}.png`} alt='tiempo icon' />
  )
}

export default WeatherIcon
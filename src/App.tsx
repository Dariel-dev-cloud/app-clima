
import CurrentWeather from "./components/cards/CurrentWeather"
import DailyForecat from "./components/cards/DailyForecat"
import HourlyForecast from "./components/cards/HourlyForecast"


function App() {


  return (
    <>
    <div className="flex flex-col gap-8" >
    <CurrentWeather/>
    <HourlyForecast/>
    <DailyForecat/>
    </div>
      </>
  ) 
}

export default App

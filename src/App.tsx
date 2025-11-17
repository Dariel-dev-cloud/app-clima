import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"
import Card from "./components/cards/Card"
import DailyForecat from "./components/cards/DailyForecat"
import HourlyForecast from "./components/cards/HourlyForecast"


function App() {

  const {data} = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({lat:10, lon:25})
  })

  return (
    <>
    <div className="flex flex-col gap-8" >
    <Card title="Tiempo Actual" >{JSON.stringify(data?.current)?.slice(0, 100)}</Card>
    <HourlyForecast/>
    <DailyForecat/>
    </div>
      </>
  ) 
}

export default App

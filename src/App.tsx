import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"
import Card from "./components/cards/Card"


function App() {

  const {data} = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({lat:10, lon:25})
  })

  return (
    <>
    <div className="flex flex-col gap-8" >
    <Card title="Tiempo Actual" >{JSON.stringify(data?.current).slice(0, 100)}</Card>
    <Card title="Pronóstico por hora (48 horas) " >{JSON.stringify(data?.hourly).slice(0, 100)}</Card>
    <Card title="Pronóstico Diario" >{JSON.stringify(data?.daily).slice(0, 100)}</Card>
    </div>
      </>
  ) 
}

export default App

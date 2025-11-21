import { Suspense, useState } from "react"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import CurrentWeather from "./components/cards/CurrentWeather"
import DailyForecat from "./components/cards/DailyForecat"
import HourlyForecast from "./components/cards/HourlyForecast"
import Map from "./components/Map"
import type { Coords } from "./types"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from "./api"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import MapLegend from "./components/MapLegend"
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton"
import DailySkeleton from "./components/skeletons/DailySkeleton"
import HourlySkeleton from "./components/skeletons/HourlySkeleton"
import AditionalInfoSkeleton from "./components/skeletons/AditionalInfoSkeleton"
import SidePanel from "./components/SidePanel"
import Hamburger from "/src/assets/hamburger.svg?react"


function App() {
    const [coordinates,setCoords] = useState<Coords>({lat:40,lon:55})

    const [location,setLocation] = useState<string>("Habana")
    const [mapType,setMapType] = useState<string>("clouds_new")
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(true)

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
    <div className="flex flex-col gap-8 pt-4 p-8 xs:pt-8 lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-[1120px]" >
      <div className="flex gap-8">
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold">Ubicación: </h1>
            <LocationDropdown location={location} setLocation={setLocation} />
         </div>
         <div className="flex gap-4">
          <h1 className="text-2xl font-semibold">Tipo de mapa: </h1>
           <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <button onClick={() => setIsSidePanelOpen(true)} >
         <Hamburger className="size-8 invert ml-auto lg:hidden" />
        </button>
       </div>
    
    <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
    <div className="relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
       <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
       <MapLegend mapType={mapType} />
    </div>
     <div className="col-span-1 2xl:row-span-2 order-2">
      <Suspense fallback={<CurrentSkeleton />}>
          <CurrentWeather coords={coords} />
      </Suspense>
      </div>
       <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
      <Suspense fallback={<DailySkeleton />}>
          <DailyForecat   coords={coords} />
      </Suspense>
      </div>
        <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
      <Suspense fallback={<HourlySkeleton />}>
          <HourlyForecast coords={coords} />
      </Suspense>
          </div>
        
        <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5">
      <Suspense fallback={<AditionalInfoSkeleton />}>
          <AdditionalInfo coords={coords} />
      </Suspense>
      </div>
    </div>
   </div>
    <SidePanel coords={coords} isSidePanelOpen={isSidePanelOpen} setIsSidePanelOpen={setIsSidePanelOpen} />
      </>
  ) 
}

export default App

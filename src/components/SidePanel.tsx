import { getAirPollution } from "@/api";
import type { Coords } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, type Dispatch, type SetStateAction } from "react";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";
import clsx from "clsx";
import { Tooltip, TooltipContent, TooltipTrigger,} from "./ui/tooltip";
import Information from "/src/assets/information.svg?react"
import Chevron from "/src/assets/ChevronLeft.svg?react"
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton";

type Props = {
   coords:Coords
   isSidePanelOpen: boolean
   setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
}

export default function SidePanel(props:Props) {
  const {isSidePanelOpen, setIsSidePanelOpen} = props
  return (
    <div className={clsx("fixed top-0 right-0 h-screen w-(--sidebar-width) shadow-md bg-sidebar z-1001 py-8 px-4 overflow-y-scroll transition-transform duration-300 lg:translate-x-0! ",
     isSidePanelOpen ? 'translate-x-0': 'translate-x-full',)}>
        <button onClick={() => setIsSidePanelOpen(false)} >
         <Chevron className="size-8 invert -ml-2 lg:hidden " />
        </button>
        <Suspense fallback={<SidePanelSkeleton/>}>
            <AirPollution {...props} />
        </Suspense>
    </div>
  )
}

function AirPollution({coords}:Props) {
    const {data} = useSuspenseQuery({
        queryKey:['pollution',coords],
        queryFn: () => getAirPollution(coords)
    })

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Contaminación del aire</h1>
            <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">ICA</h1>
                <Tooltip>
                  <TooltipTrigger>
                  <Information className="size-4 invert" />
                  </TooltipTrigger>
                  <TooltipContent className="z-3000">
                  <p className="max-w-xs"> 
                    {" "}
                    Índice de Calidad del Aire. Valores posibles: 1, 2, 3, 4, 5. Donde 1 = Bueno,
                    2 = Aceptable, 3 = Moderado, 4 = Malo, 5 = Muy Malo.</p>
                  </TooltipContent>
                </Tooltip>
            </div>
            { Object.entries(data.list[0].components).map(([key,value]) =>{
                const pollutant = airQualityRanges[key.toUpperCase() as keyof typeof airQualityRanges]
                const max = Math.max(pollutant["Muy Malo"].min, value)
                
                const currentLevel = (()=>{
                    for (const [level, range] of Object.entries(pollutant)){
                        if(value >= range.min && ( range.max === null || value <= range.max)) return level
                    }
                    return 'Muy Malo'
                })()
                
                const qualityColor = (() => {
                switch (currentLevel){
                  case "Bueno":
                    return 'bg-green-500'
                  case "Aceptable":
                    return 'bg-yellow-500'
                  case "Moderado":
                    return 'bg-orange-500'
                  case "Malo":
                    return 'bg-red-500'
                  case "Muy Malo":
                    return 'bg-purple-500'
                  default:
                    return 'bg-zinc-500'
                     }
                })()
                return (
                    <Card key={key} 
                    childrenClassName="flex flex-col gap-3"
                    className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0! " >
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                                <span className="text-lg font-bold capitalize">{key}</span>
                            <Tooltip>
                                 <TooltipTrigger>
                                 <Information className="size-4 invert" />
                                 </TooltipTrigger>
                                 <TooltipContent className="z-3000">
                                 <p className="max-w-xs"> 
                                    Concentracíon de {pollutantNameMapping[key.toUpperCase() as Pollutant ]}
                                  </p>
                                  </TooltipContent>
                            </Tooltip>
                          </div>
                         <span className="text-lg font-semibold">{value}</span>
                         </div>
                        <Slider min={0} max={max} value={[value]} disabled/>
                        <div className="flex justify-between text-xs">
                            <p>0</p>
                            <p>{max}</p>
                        </div>
                        <div className="flex justify-between">
                        { Object.keys(pollutant).map(quality => (
                            <span key={quality} className={clsx("px-1 py-1 rounded-md text-xs font-medium", 
                            quality === currentLevel ? qualityColor: 'bg-muted text-muted-foreground')}>
                                  {quality} 
                            </span>
                        ))}
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

type AirQualityLevel = "Bueno" | "Aceptable" | "Moderado" | "Malo" | "Muy Malo"

interface Range {
  min: number
  max: number | null
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3"

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>

const airQualityRanges: AirQualityRanges = {
  SO2: {
    Bueno: { min: 0, max: 20 },
    Aceptable: { min: 20, max: 80 },
    Moderado: { min: 80, max: 250 },
    Malo: { min: 250, max: 350 },
    "Muy Malo": { min: 350, max: null },
  },
  NO2: {
    Bueno: { min: 0, max: 40 },
    Aceptable: { min: 40, max: 70 },
    Moderado: { min: 70, max: 150 },
    Malo: { min: 150, max: 200 },
    "Muy Malo": { min: 200, max: null },
  },
  PM10: {
    Bueno: { min: 0, max: 20 },
    Aceptable: { min: 20, max: 50 },
    Moderado: { min: 50, max: 100 },
    Malo: { min: 100, max: 200 },
    "Muy Malo": { min: 200, max: null },
  },
  PM2_5: {
    Bueno: { min: 0, max: 10 },
    Aceptable: { min: 10, max: 25 },
    Moderado: { min: 25, max: 50 },
    Malo: { min: 50, max: 75 },
    "Muy Malo": { min: 75, max: null },
  },
  O3: {
    Bueno: { min: 0, max: 60 },
    Aceptable: { min: 60, max: 100 },
    Moderado: { min: 100, max: 140 },
    Malo: { min: 140, max: 180 },
    "Muy Malo": { min: 180, max: null },
  },
  CO: {
    Bueno: { min: 0, max: 4400 },
    Aceptable: { min: 4400, max: 9400 },
    Moderado: { min: 9400, max: 12400 },
    Malo: { min: 12400, max: 15400 },
    "Muy Malo": { min: 15400, max: null },
  },
  NO: {
    Bueno: { min: 0, max: 20 },
    Aceptable: { min: 20, max: 40 },
    Moderado: { min: 40, max: 60 },
    Malo: { min: 60, max: 80 },
    "Muy Malo": { min: 80, max: null },
  },
  NH3: {
    Bueno: { min: 0, max: 40 },
    Aceptable: { min: 40, max: 70 },
    Moderado: { min: 70, max: 150 },
    Malo: { min: 150, max: 200 },
    "Muy Malo": { min: 200, max: null },
  },
}

const pollutantNameMapping: Record<Pollutant, string> = {
    SO2: "Dióxido de azufre",
    NO2: "Dióxido de nitrógeno",
    PM10: "Partículas (PM10)",
    PM2_5: "Partículas finas (PM2.5)",
    O3: "Ozono",
    CO: "Monóxido de carbono",
    NO: "Monóxido de nitrógeno",
    NH3: "Amoníaco",
}
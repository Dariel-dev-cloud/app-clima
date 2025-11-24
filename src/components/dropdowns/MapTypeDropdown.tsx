import { Select, SelectContent, SelectItem,SelectTrigger, SelectValue,} from "@/components/ui/select"
import type { Dispatch, SetStateAction } from "react"

type Props = {
  mapType: string,
  setMapType: Dispatch<SetStateAction<string>>
}

const mapTypes = [
  { value: "clouds_new", label: "Nubes" },
  { value: "precipitation_new", label: "Precipitación" },
  { value: "pressure_new", label: "Presión" },
  { value: "wind_new", label: "Viento" },
  { value: "temp_new", label: "Temperatura" },
]

export default function MapTypeDropdown({ mapType, setMapType }:Props) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)} >
      <SelectTrigger className="w-full xs:w-[180px]">
        <SelectValue placeholder="ubicación" />
      </SelectTrigger>
      <SelectContent className="z-1000" >
        {mapTypes.map((type) => (
          
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

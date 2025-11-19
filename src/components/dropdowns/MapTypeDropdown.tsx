import { Select, SelectContent, SelectItem,SelectTrigger, SelectValue,} from "@/components/ui/select"
import type { Dispatch, SetStateAction } from "react"

type Props = {
  mapType: string,
  setMapType: Dispatch<SetStateAction<string>>
}

export default function MapTypeDropdown({ mapType, setMapType }:Props) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)} >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="ubicación" />
      </SelectTrigger>
      <SelectContent className="z-1000" >
        {types.map(type => (
            <SelectItem key={type} value={type} className="capitalize" >
              {type.split('_')[0]}
            </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const types = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
]
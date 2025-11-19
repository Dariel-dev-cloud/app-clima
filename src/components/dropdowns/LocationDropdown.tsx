
import { Select, SelectContent, SelectItem,SelectTrigger, SelectValue,} from "@/components/ui/select"
import type { Dispatch, SetStateAction } from "react"

type Props = {
  location: string,
  setLocation: Dispatch<SetStateAction<string>>
}

export default function LocationDropdown({ location, setLocation }:Props) {
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)} >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="ubicación" />
      </SelectTrigger>
      <SelectContent className="z-1000" >
        {locations.map(city => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const locations = [
  "Habana",
  "Bangkok",
  "Tokyo",
  "Seoul",
  "Dubai",
  "Manila",
  "London",
  "New York",
  "Paris",
  "Berlin",
  "Madrid",
  "Lisbon",
]

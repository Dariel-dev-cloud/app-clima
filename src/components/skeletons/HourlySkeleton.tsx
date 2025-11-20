import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"

function HourlySkeleton() {
  return (
   <Card childrenClassName="flex gap-6 overflow-x-scroll" title="Pronóstico por hora (48 horas)">
            {Array.from({length: 48}).map((_, index) => (
               <div key={index} className="flex flex-col gap-2 items-center p-2   " >
                 <Skeleton className="w-16 h-6 " />
                 <Skeleton className="size-8" />
                 <Skeleton className="w-8 h-6" />
               </div>
            ))}
       </Card>
  )
}

export default HourlySkeleton
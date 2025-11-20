import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"




function DailySkeleton() {
  return (
    <Card title="Pronóstico Diario" childrenClassName='flex flex-col gap-4' >
         
          {Array.from({length: 8}).map((_, index) => (
            <div key={index} className='flex justify-between'>
              <Skeleton className="w-9 h-8" />
             <Skeleton className="size-8 rounded-full" />
              <Skeleton className="size-8" />
              <Skeleton className="size-8" />
              <Skeleton className="size-8" />
            </div>
          ))}
    
          </Card>
  )
}

export default DailySkeleton
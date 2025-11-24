import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"

function CurrentSkeleton() {
  return (
     <Card 
        title="Tiempo Actual" 
        childrenClassName='flex flex-col items-center gap-6 2xl:justify-between'>
            <div className='flex flex-col gap-2 items-center'>
               <Skeleton className="w-32 h-16" />
               <Skeleton className="size-14 rounded-full" />
               <Skeleton className="w-36 h-7" />
            </div>
            <div className='flex flex-col gap-2 ' >
               <Skeleton className="w-36 h-10" />
            </div>
    
            <div className='flex justify-between w-full'>
                
                <div className='flex flex-col items-center gap-2'>
                    <p className='text-gray-500'>Sensación Térmica</p>
                    <Skeleton className="w-16 h-6" />
                </div>
    
                <div className='flex flex-col items-center gap-2'>
                    <p className='text-gray-500'>Humedad</p>
                    <Skeleton className="w-15 h-6" />
                </div>
    
                <div className='flex flex-col items-center gap-2'>
                    <p className='text-gray-500'>Velocidad del Viento</p>
                    <Skeleton className="w-16 h-6" />
                </div>
    
            </div>
           
        </Card>
  )
}

export default CurrentSkeleton
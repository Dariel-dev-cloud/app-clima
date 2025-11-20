import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"




export default function AditionalInfoSkeleton() {
  return (
    <Card title='Información meteorológica adicional' childrenClassName='flex flex-col gap-8' >
           {Array.from({length:6}).map((_, index) => (
            <div key={index} className='flex justify-between' >
              <div className='flex gap-4'>
                <Skeleton className="w-20 h-8"/>
                <Skeleton className="size-8 rounded-full"/>
              </div>
                <Skeleton className="size-8"/>
              
            </div>
           ))}
       </Card>
  )
}
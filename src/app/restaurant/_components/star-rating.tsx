import { Progress } from "@components/ui/progress";

interface StarRatingProps{
    value:number,
    star: number
}

export default function StarRating({value, star}:StarRatingProps) {
  return (
    <div className='w-full h-fit flex items-center gap-4 '>
        <p className="text-yellow-500 text-right w-[20%]">{'★'.repeat(star)}</p>
        <Progress value={value} className='w-[80%] h-2 fill-gray-500'/>
    </div>
  )
}

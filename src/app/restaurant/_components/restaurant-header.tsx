import pb from "@service/pocketbase.service";
import { getRestaurant, getRestaurantReviewsAmount } from "@service/restaurant.service";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Edit3, Eye, Heart, MapPin, Star } from "@geist-ui/icons";


interface RestaurantHeaderProps {
    recordId: string;
}

export default async function RestaurantHeader({ recordId }: RestaurantHeaderProps) {
    try {
        const restaurantRequest = getRestaurant(recordId)
        const reviewAmountRequest = getRestaurantReviewsAmount(recordId)

        const [restaurant, reviewAmount] =  await Promise.all([
            restaurantRequest,
            reviewAmountRequest
        ])

        const images:string[] = (restaurant.images as string[] || []).map(image=>{
            return pb.files.getUrl(restaurant, image , {'thumb': '0x300'});
        })
        return (
            <>
                <section className="w-full h-[60dvh] flex-grow max-h-full flex flex-col gap-8">
                    <div className="w-full h-full gap-4 flex">
                        <div className="w-[45%] h-full bg-black rounded-xl overflow-clip">
                            {images[0] && <Image width={1024} height={720} className='w-full h-full object-cover opacity-80' src={images[0]} alt='coverImage'/>}
                        </div>
                        <div className="w-[25%] h-full bg-black rounded-xl overflow-clip">
                            {images[1] && <Image width={1024} height={720} className='w-full h-full object-cover opacity-80' src={images[1]} alt='coverImage'/>}
                        </div>
                        <div className="w-[30%] h-full flex flex-col gap-4">
                            <div className="w-full h-[50%] bg-black rounded-xl overflow-clip">
                                {images[2] && <Image width={1024} height={720} className='w-full h-full object-cover opacity-80' src={images[2]} alt='coverImage'/>}
                            </div>
                            <div className="w-full h-[50%] bg-black rounded-xl overflow-clip relative">
                                {
                                    images.length <= 4 ?
                                    (
                                        images[3] && <Image width={1024} height={720} className='w-full h-full object-cover opacity-80' src={images[3]} alt='coverImage'/>
                                    )
                                    :
                                    (
                                        <div className="w-full h-full">
                                            <Image width={1024} height={720} className='w-full h-full object-cover opacity-35 hover:opacity-20 transition-all duration-300 ease-in-out absolute' src={images[3]} alt='coverImage'/>
                                            <h1 className="z-10 text-3xl text-white w-full h-full justify-center items-center flex">+&nbsp;{images.length-4}</h1>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </section>
                {/* TODO: ini bisa cabut component */}
                <section className="w-full h-fit flex justify-between gap-8">
                        <div className="w-[60%] h-full  flex flex-col gap-8">
                            <div className="w-full h-full flex flex-col gap-8">
                                <div className="w-full h-full flex flex-col gap-1">
                                    <h1 className="text-2xl lg:text-3xl font-medium">{restaurant.name}</h1>
                                    <div className="flex gap-4">
                                        <div className="flex gap-2">
                                            <Star color='#6b7280' className="w-4 flex-shrink-0"/>
                                            <p className="text-gray-500 text-sm lg:text-base">4.5</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Eye color='#6b7280' className="w-4 flex-shrink-0"/>
                                            <p className="text-gray-500 text-sm lg:text-base">12313</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Edit3 color='#6b7280' className="w-4 flex-shrink-0"/>
                                            <p className="text-gray-500 text-sm lg:text-base">{reviewAmount}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Heart color='#6b7280' className="w-4 flex-shrink-0"/>
                                            <p className="text-gray-500 text-sm lg:text-base">231</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm lg:text-base text-gray-500 w-[80%]">{restaurant.description}</p>
                            </div>
                            
                            <div className="bg-secondary p-4 rounded-lg flex flex-col gap-2">
                                <h1 className="text-sm lg:text-base font-medium">Customer Sentiment Overview:</h1>
                                <div>
                                    <p className="text-sm lg:text-base text-gray-500 italic">“Absolutely the best sushi I’ve ever had! The fish was so fresh and the presentation was stunning. The chef’s special rolls are a must-try.”</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[40%] h-full flex items-end flex-col gap-1">

                            <span className="flex h-fit gap-2 items-start justify-center ">
                                <MapPin color='#6b7280' className="w-4 flex-shrink-0 "/>
                                <p className="text-sm lg:text-base text-gray-500 text-wrap">{restaurant.location}</p>
                            </span>
                            <div>
                                <p className="text-sm lg:text-base text-gray-500 text-wrap">Opening Hours: 07:00 - 18:00</p>
                            </div>
                        </div>
                    </section>
            </>
        );
    } catch (error) {
        console.error(error)
        return notFound();
    }
}
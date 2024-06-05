import pb, { PB_KEYS } from "@service/pocketbase.service"
import { getRestaurantMenusPaged } from "@service/restaurant.service"
import Image from "next/image"
import { notFound } from "next/navigation"

interface RestaurantMenusProps{
    recordId:string
}

export default async function RestaurantMenus({recordId}:RestaurantMenusProps) {
    try {
        const menus = await getRestaurantMenusPaged(recordId, 1,10)

        return (
            <div>
                { menus.items.length != 0 &&  menus.items.map((menu)=>{
                    const menuImage = pb.files.getUrl(menu, menu.image as string, {'thumb': '0x300'});
                    return(
                        <div>
                            <div>{menu.name}</div>
                            <Image width={1024} height={720} className='w-full h-full object-cover opacity-60 absolute' src={menuImage} alt='menuImage'></Image>
                        </div>
                        )
                    }) 
                }
            </div>
        )
    } catch (error) {
        return notFound()
    }
}

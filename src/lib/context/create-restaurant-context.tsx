"use client"
import { AlertCircle } from "@geist-ui/icons";
import { createRestaurant } from "@service/restaurant.service";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

interface CreateRestaurantProviderProps{
    children: ReactNode
}

export type CreateRestaurantContextType = {
	restaurantData: Partial<RestaurantBase>;
    menuData: MenuBase[] 
    appendRestaurantData: (data: Partial<RestaurantBase>) => any
    appendMenuData: (data : MenuBase) => any
    finalize: () => any,
    isLoading: boolean
};


export const CreateRestaurantContext = createContext<CreateRestaurantContextType>({
    restaurantData: {},
    menuData: [],
    appendRestaurantData: ()=>{},
    appendMenuData: ()=>{},
    finalize: ()=>{},
    isLoading:false
})

const InitialRestaurantData: Partial<RestaurantBase> = {};


export default function CreateRestaurantContextProvider({children}: CreateRestaurantProviderProps){
    const [restaurantData, setRestaurantData] = useState<Partial<RestaurantBase>>(InitialRestaurantData);
    const [menuData, setMenuData] = useState<MenuBase[]>([]) 
    const router = useRouter();


    const { mutate: appendRestaurantData, isLoading: isAppendRestaurantDataLoading } = useMutation(
        async (data: Partial<RestaurantBase>) => {
            setRestaurantData((prev) => ({
                ...prev,
                ...data,
                keywords: {
                    ...prev.keywords,
                    tags: [...(data.keywords?.tags || [])]
                }
            }));
        }
    );

    const {mutate:appendMenuData, isLoading:isAppendMenuDataLoading} = useMutation(
        async (data:MenuBase)=>{
            if(restaurantData.restaurantOwner == ""){
                throw new Error("Restaurant data not available yet")
            }
            setMenuData(prev=>[...prev, data])
        }
    )

    const transformRestaurantData = () => {
        const formData = new FormData();
        if (restaurantData.cover instanceof FileList && restaurantData.cover.length > 0) {
            formData.append('cover', restaurantData.cover[0]);
        }
    
        if (restaurantData.images && restaurantData.images.length) {
            for (let i = 0; i < restaurantData.images.length; i++) {
                formData.append('images', restaurantData.images[i]);
            }
        }
        const otherData = {
            name: restaurantData.name,
            description: restaurantData.description,
            location: restaurantData.location,
            restaurantOwner: restaurantData.restaurantOwner,
            keywords: restaurantData.keywords, 
        };
        formData.append('otherData', JSON.stringify(otherData));

        return formData
    };

    const {mutate:finalize, isLoading:isFinalizeLoading} = useMutation(
        async ()=>{
            const restaurant:FormData = transformRestaurantData();
            return await createRestaurant(restaurant)
        },
        {
            onSuccess:(data)=>{
                toast("Restaurant successfully created!")
                router.push("/home")
            },
            onError:(error:Error)=>{
                toast.error(error.message,{
                    icon:<AlertCircle className='w-full'/>
                })
            }
        }
    )


    return(
        <CreateRestaurantContext.Provider
            value={{
                restaurantData,
                menuData,
                appendRestaurantData,
                appendMenuData,
                finalize,
                isLoading: isAppendRestaurantDataLoading || isAppendMenuDataLoading || isFinalizeLoading
            }}
        >
            {children}
        </CreateRestaurantContext.Provider>
    )
        
}


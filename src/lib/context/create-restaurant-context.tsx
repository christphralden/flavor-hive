"use client"
import { createContext, ReactNode, useState } from "react";
import { useMutation } from "react-query";

interface CreateRestaurantProviderProps{
    children: ReactNode
}

export type CreateRestaurantContextType = {
	restaurantData: RestaurantBase | null;
    menuData: MenuBase[] | null
    appendRestaurantData: ({data, key} : AppendRestaurantData) => any
    appendMenuData: (data : MenuBase) => any
    isLoading: boolean
};


export const CreateRestaurantContext = createContext<CreateRestaurantContextType>({
    restaurantData: null,
    menuData: null,
    appendRestaurantData: ()=>{},
    appendMenuData: ()=>{},
    isLoading:false
})

const InitialRestaurantData:RestaurantBase = {
    coverImage:"",
    description:"",
    images:[],
    location:"",
    name:"",
    restaurantOwner:"",
    keywords:{
        tags:[]
    }
}

export default function CreateRestaurantContextProvider({children}: CreateRestaurantProviderProps){
    const [restaurantData, setRestaurantData] = useState<RestaurantBase>(InitialRestaurantData) 
    const [menuData, setMenuData] = useState<MenuBase[]>([]) 


    const {mutate:appendRestaurantData, isLoading:isAppendRestaurantDataLoading} = useMutation(
        async ({data, key}:AppendRestaurantData)=>{
            if(key !== "keywords.tags"){
                setRestaurantData((prev)=>({
                    ...prev,
                    [key]: data
                }))
            }
            else if(key === "keywords.tags"){
                setRestaurantData((prev)=>({
                    ...restaurantData,
                    keywords:{
                        tags:[...prev.keywords.tags, data]
                    }
                }))
            }
        }
    )


    const {mutate:appendMenuData, isLoading:isAppendMenuDataLoading} = useMutation(
        async (data:MenuBase)=>{
            if(restaurantData.restaurantOwner == ""){
                throw new Error("Restaurant data not available yet")
            }
            setMenuData(prev=>[...prev, data])
        }
    )


    return(
        <CreateRestaurantContext.Provider
            value={{
                restaurantData,
                menuData,
                appendRestaurantData,
                appendMenuData,
                isLoading: isAppendRestaurantDataLoading || isAppendMenuDataLoading
            }}
        >
            {children}
        </CreateRestaurantContext.Provider>
    )
        
}


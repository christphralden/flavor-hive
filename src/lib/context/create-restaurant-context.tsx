"use client"
import { createContext, ReactNode, useState } from "react";
import { useMutation } from "react-query";

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

function isRestaurantBase(obj: Partial<RestaurantBase>): obj is RestaurantBase {
    return (
        typeof obj.name === 'string' &&
        typeof obj.coverImage === 'string' &&
        Array.isArray(obj.images) &&
        typeof obj.description === 'string' &&
        typeof obj.location === 'string' &&
        typeof obj.keywords === 'object' &&
        Array.isArray(obj.keywords.tags) &&
        typeof obj.restaurantOwner === 'string'
    );
}

export default function CreateRestaurantContextProvider({children}: CreateRestaurantProviderProps){
    const [restaurantData, setRestaurantData] = useState<Partial<RestaurantBase>>(InitialRestaurantData);
    const [menuData, setMenuData] = useState<MenuBase[]>([]) 


    const { mutate: appendRestaurantData, isLoading: isAppendRestaurantDataLoading } = useMutation(
        async (data: Partial<RestaurantBase>) => {
            setRestaurantData((prev) => ({
                ...prev,
                ...data,
                keywords: {
                    ...prev.keywords,
                    tags: [...(prev.keywords?.tags || []), ...(data.keywords?.tags || [])]
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

    const completeRestaurantData = () => {
        if (!isRestaurantBase(restaurantData)) {
            throw new Error("Incomplete restaurant data");
        }
        return restaurantData as RestaurantBase;
    };

    const {mutate:finalize, isLoading:isFinalizeLoading} = useMutation(
        async ()=>{

        },
        {
            onSuccess:()=>{

            },
            onError:()=>{

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


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
    removeMenuData: (data: MenuBase)=>any
    finalize: () => any,
    isLoading: boolean
};


export const CreateRestaurantContext = createContext<CreateRestaurantContextType>({
    restaurantData: {},
    menuData: [],
    appendRestaurantData: ()=>{},
    appendMenuData: ()=>{},
    removeMenuData: ()=>{},
    finalize: ()=>{},
    isLoading:false
})

const InitialRestaurantData: Partial<RestaurantBase> = {};


export default function CreateRestaurantContextProvider({children}: CreateRestaurantProviderProps){
    const [restaurantData, setRestaurantData] = useState<Partial<RestaurantBase>>(InitialRestaurantData);
    const [menuData, setMenuData] = useState<MenuBase[]>([]) 
    const router = useRouter();
    //TODO: useCallback for performance

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
            if (menuData.length >= 20) {
                return;
            }
            setMenuData(prev=>[...prev, data])
        }
    )
    const removeMenuData = (menu:MenuBase) => {
        setMenuData(currentItems => currentItems.filter(item => item !== menu));
    };

    const transformRestaurantData = () => {
        const restaurantForm = new FormData();
        if (restaurantData.cover instanceof FileList && restaurantData.cover.length > 0) {
            restaurantForm.append('cover', restaurantData.cover[0]);
        }
    
        if (restaurantData.images && restaurantData.images.length) {
            for (let i = 0; i < restaurantData.images.length; i++) {
                restaurantForm.append('images', restaurantData.images[i]);
            }
        }
        const otherData = {
            name: restaurantData.name,
            description: restaurantData.description,
            location: restaurantData.location,
            restaurantOwner: restaurantData.restaurantOwner,
            keywords: restaurantData.keywords, 
        };
        restaurantForm.append('otherData', JSON.stringify(otherData));

        return restaurantForm
    };

    const transformMenuData = () => {
        const menusForm = menuData.map(menu => {
            const menuForm = new FormData();
            menuForm.append('name', menu.name);
            menuForm.append('description', menu.description);
            menuForm.append('price', menu.price.toString());
            if (menu.image instanceof FileList && menu.image.length > 0) {
                menuForm.append('image', menu.image[0]); 
            }
            return menuForm;
        });
        return menusForm;
    };

    const {mutate:finalize, isLoading:isFinalizeLoading} = useMutation(
        async ()=>{
            const restaurant:FormData = transformRestaurantData();
            const menu:FormData[] = transformMenuData()
            return await createRestaurant(restaurant, menu)
        },
        {
            onSuccess:(data)=>{
                const restaurantId = data.resRestaurant.id
                toast("Restaurant successfully created!")
                router.push(`/restaurant/${restaurantId}`)
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
                removeMenuData,
                finalize,
                isLoading: isAppendRestaurantDataLoading || isAppendMenuDataLoading || isFinalizeLoading
            }}
        >
            {children}
        </CreateRestaurantContext.Provider>
    )
        
}


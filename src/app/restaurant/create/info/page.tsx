
"use client"
import {
    Card,
    CardContent,
    CardFooter,
} from "@components/ui/card"
import { InputLabelled } from "@components/ui/input-labelled";
import { InputPrefixed } from "@components/ui/input-prefixed";
import { Button } from "@components/ui/button";
import { TextareaLabelled } from "@components/ui/textarea-labelled";
import Link from "next/link";
import CreateRestaurantHeader from "../_components/create-restaurant-header";
import { useCreateRestaurant } from "@hooks/useCreateRestaurant";
import { useEffect } from "react";


export default function CreateRestaurantInfo(){
    const {restaurantData, appendRestaurantData} = useCreateRestaurant();
    useEffect(() => {
      appendRestaurantData({
        key:"name",
        data:"pantek"
      })
     
    }, [])
    console.log(restaurantData)
    return(
        <>
            <section className="w-full">
                <CreateRestaurantHeader
                    header="Lets get you started!"
                    description="We just need some basic info to get your restaurant up and running."
                    step={1}
                />
            </section>
            <section className="w-full h-full">
                <Card className="w-full h-full p-4 py-8 flex flex-col justify-between">
                    <CardContent className="mb-8">
                        <form className="flex flex-col gap-8" action="">

                            <div className="flex flex-col gap-1">
                                <div className="flex gap-2 items-baseline justify-between">
                                    <p className="font-medium text-sm lg:text-base">Restaurant Name</p>
                                    {/* <div className="text-gray-500 text-xs lg:text-sm ">{children}</div> */}
                                </div>
                                <InputPrefixed prefix="flavorhive.com/" placeholder="Restaurant"/>
                            </div>

                            <TextareaLabelled label="Description" className="h-[150px] max-h-[150px] min-h-[150px]"  placeholder="Talk about your restaurant here"/>
                            <InputLabelled label="Location" placeholder="Somewhere"/>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between w-full">
                        <Link className="w-full" href={'images'}><Button className="w-full">Continue</Button></Link>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}

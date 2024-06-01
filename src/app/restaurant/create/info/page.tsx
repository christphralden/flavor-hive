
"use client"
import { Progress } from "@components/ui/progress";
import {
    Card,
    CardContent,
    CardFooter,
} from "@components/ui/card"
import { InputLabelled } from "@components/ui/input-labelled";
import { InputPrefixed } from "@components/ui/input-prefixed";
import { Button } from "@components/ui/button";
import { TextareaLabelled } from "@components/ui/textarea-labelled";
import { useEffect, useState } from "react";


export default function CreateRestaurant(){
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const timer = setTimeout(() => setProgress(100), 500)
        return () => clearTimeout(timer)
      }, [])
    return(
        <>
            <section className="w-1/2 flex flex-col gap-8">
                <div className="flex flex-col gap-1 w-full">
                    <h1 className="text-2xl lg:text-3xl font-medium">Lets get you started!</h1>
                    <p className="text-gray-500">We just need some basic info to get your restaurant up and running.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p>Step 1 of 4</p>
                    <div className="flex gap-6">
                        <Progress className="w-1/4 h-2" value={progress}/>
                        <Progress className="w-1/4 h-2" value={0}/>
                        <Progress className="w-1/4 h-2" value={0}/>
                        <Progress className="w-1/4 h-2" value={0}/>
                    </div>
                </div>
            </section>
            <section className="w-1/2">
                <Card className="w-full p-4 py-8">
                    <CardContent className="mb-8">
                        <form className="flex flex-col gap-8" action="">

                            <div className="flex flex-col gap-1">
                                <div className="flex gap-2 items-baseline justify-between">
                                    <p className="font-medium text-sm lg:text-base">Restaurant Name</p>
                                    {/* <div className="text-gray-500 text-xs lg:text-sm ">{children}</div> */}
                                </div>
                                <InputPrefixed prefix="flavorhive.com/" placeholder="Restaurant"/>
                            </div>

                            <TextareaLabelled label="Description" className="h-[100px] max-h-[150px]" placeholder="Talk about your restaurant here"/>
                            <InputLabelled label="Location" placeholder="Somewhere"/>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between w-full">
                        <Button className="w-full">Continue</Button>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}

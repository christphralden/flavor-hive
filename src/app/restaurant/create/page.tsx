
"use client"
import CreateRestaurantForm from "../_components/create-restaurant-form";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { createRestaurant, State } from "@actions/actions";
import { useEffect } from "react";

export default function CreateRestaurant(){
    const { register:formRegister, watch, formState: { errors }, reset } = useForm<RestaurantBase>();
    const [state, formAction] = useFormState<State, FormData>(createRestaurant, {});
    
    useEffect(() => {
        if(state.status === 200){
            reset();
        }
    }, [state])
    
    return(
        <div>
            <form action={formAction}>
                <CreateRestaurantForm formRegister={formRegister} errors={errors}/>
            </form>
        </div>
    )
}

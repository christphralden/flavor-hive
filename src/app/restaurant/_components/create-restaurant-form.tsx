"use client"
import { createRestaurant } from "@service/restaurant.service"
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export default function CreateRestaurantForm(){
    const { register:formRegister, watch, formState: { errors }, reset } = useForm<RestaurantBase>();
    const [state, formAction] = useFormState<State, FormData>(createRestaurant, {});

    useEffect(() => {
        if (state.status === 200) {
            reset();
        }
    }, [state])
    
    return(
        <form action={formAction}>
            <div>
                <label>Name:</label>
                <input type='text' className='text-black' {...formRegister("name", { required: true })} />
                {errors.name && <p>Name is required</p>}
            </div>
            <div>
                <label>Description:</label>
                <input type='text' className='text-black' {...formRegister("description", { required: true })} />
                {errors.description && <p>Description is required</p>}
            </div>
            <div>
                <label>Images:</label>
                {/* <input type='image' multiple className='text-black' {...formRegister("images", { required: true })} /> */}
                {/* {errors.images && <p>Images is required</p>} */}
            </div>
            <div>
                <label>Location:</label>
                <input type='text' multiple className='text-black' {...formRegister("location", { required: true })} />
                {errors.location && <p>Location is required</p>}
            </div>
            <div>
                <label>Tags:</label>
                <input type='text' multiple className='text-black' {...formRegister("keywords.tags", { required: true })} />
                {errors.keywords?.tags && <p>Tags is required</p>}
            </div>
            <button type="submit">submit</button>
        </form>
    )
}
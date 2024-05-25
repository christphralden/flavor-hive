"use client"
import { FieldErrors, FieldValues, useForm, UseFormRegister } from "react-hook-form";

interface CreateRestaurantFormProps{
    formRegister: UseFormRegister<RestaurantBase>
    errors: FieldErrors<FieldValues>
}

export default function CreateRestaurantForm({formRegister, errors}:CreateRestaurantFormProps){
    return(
        <>
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
                {errors.tags && <p>Tags is required</p>}
            </div>
            <button type="submit">submit</button>
        </>
    )
}
"use client"
import pb from '@service/pocketbase';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // register function
    async function registerUser(data: any) {
        const newUser = {
            "username": data.username,
            "email": data.email,
            "emailVisibility": true,
            "password": data.password,
            "passwordConfirm": data.passwordConfirm,
            "name": data.name
        };
        try {
            const authData = await pb.collection("users").create(newUser);
            alert('User registered successfully!');
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(registerUser)}>
                <div>
                    <label>Username:</label>
                    <input type='text' className='text-black' {...register("username", { required: true })} />
                    {errors.username && <p>Username is required</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" className='text-black' {...register("email", { required: true })} />
                    {errors.email && <p>Email is required</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" className='text-black' {...register("password", { required: true, minLength: 8 })} />
                    {errors.password && <p>Password must be at least 8 characters long</p>}
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" className='text-black' {...register("passwordConfirm", { required: true })} />
                    {errors.passwordConfirm && <p>Passwords must match</p>}
                </div>
                <div>
                    <label>Name:</label>
                    <input type='text' className='text-black'{...register("name", { required: true })} />
                    {errors.name && <p>Name is required</p>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

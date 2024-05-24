"use client"
import { register } from '@service/auth';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Register() {
    const { register:formRegister, watch, formState: { errors } } = useForm();

    return (
        <div>
            <form action={register}>
                <div>
                    <label>Username:</label>
                    <input type='text' className='text-black' {...formRegister("username", { required: true })} />
                    {errors.username && <p>Username is required</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" className='text-black' {...formRegister("email", { required: true })} />
                    {errors.email && <p>Email is required</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" className='text-black' {...formRegister("password", { required: true, minLength: 8 })} />
                    {errors.password && <p>Password must be at least 8 characters long</p>}
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" className='text-black' {...formRegister("passwordConfirm", { required: true })} />
                    {errors.passwordConfirm && <p>Passwords must match</p>}
                </div>
                <div>
                    <label>Name:</label>
                    <input type='text' className='text-black'{...formRegister("name", { required: true })} />
                    {errors.name && <p>Name is required</p>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

"use client"
import { Button } from '@components/ui/button';
import { InputLabelled } from '@components/ui/input-labelled';
import { register } from '@service/auth.service';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from '@geist-ui/icons'


export default function Register() {
    const { register: formRegister, watch, formState: { errors } } = useForm();
    
    
    return (
        <div className='w-full h-fit flex flex-col gap-8'>
            
            <div className='flex flex-col gap-1'>
                <h1 className="text-4xl font-medium tracking-tight">Let's join with us</h1>
                <p className="text-base text-gray-500">Join us for a delicious journey and explore a world of flavors.</p>
            </div>
            <form className='w-full h-full flex flex-col gap-8' action={register}>
                    <div className='w-full gap-4 flex flex-col'>
                        <InputLabelled placeholder='josex@gmail.com' label='Email' type="email" className='text-black' {...formRegister("email", { required: true })} />
                        <InputLabelled placeholder='Josex Tano' label='Name' type='text' className='text-black' {...formRegister("name", { required: true })} />
                        <InputLabelled placeholder='ilovenilou' label='Username' type='text' className='text-black' {...formRegister("username", { required: true })} />
                        <InputLabelled placeholder='Yellomeowmeow:3' label='Password' type="password" className='text-black' {...formRegister("password", { required: true, minLength: 8 })} />
                        <InputLabelled placeholder='Yellomeowmeow:3' label='Confirm Password' type="password" className='text-black' {...formRegister("passwordConfirm", { required: true })} />
                    </div>
                
                <div className='flex gap-4 w-full flex-col '>
                    <Button className='w-full' type="submit">Register</Button>
                    <Button variant={'secondary'} className='w-full' >Continue with Google</Button>
                </div>
            </form>
        </div>
    );
}


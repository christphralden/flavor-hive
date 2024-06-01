
import React from 'react';
import RegisterForm from '../_components/register-form';


export default function Register() {
    return (
        <div className='w-full h-fit flex flex-col gap-8'>
            <div className='flex flex-col gap-1'>
                <h1 className="text-3xl lg:text-4xl font-medium tracking-tight">Let's join with us</h1>
                <p className="text-sm lg:text-base text-gray-500">Join us for a delicious journey and explore a world of flavors.</p>
            </div>
            <RegisterForm/>
        </div>
    );
}


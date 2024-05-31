'use client';
import { Button } from '@components/ui/button';
import {Input} from '@components/ui/input';
import {InputLabelled} from '@components/ui/input-labelled';
import {useAuth} from '@hooks/useAuth';
import React from 'react';
import {useForm} from 'react-hook-form';

export default function LoginPage() {
	const {register, handleSubmit} = useForm();

	const {login} = useAuth();

	const handleLogin = async (data: any) => {
		await login({
			email: data.email,
			password: data.password,
		});
	};

	return (
		<div className="w-full h-fit flex flex-col gap-8">
			<div className='flex flex-col gap-1'>
        <h1 className="text-4xl font-medium tracking-tight">Welcome back</h1>
        <p className="text-base text-gray-500">We're hungry too, lets find somewhere to eat</p>
      </div>
			<form
				className="flex flex-col gap-8 justify-start"
				onSubmit={handleSubmit(handleLogin)}
			>
				<div className='flex flex-col gap-4'>
        <InputLabelled
					label="Username"
					type="text"
					placeholder="josex@gmail.com"
					{...register('email')}
				/>
				<InputLabelled
          label="Password"
					type="password"
					placeholder="Yellowmeowmeow:3"
					{...register('password')}
				/>
        </div>
				<div className='flex gap-4 w-full flex-col '>
            <Button className='w-full' type="submit">Login</Button>
            <Button variant={'secondary'} className='w-full' >Continue with Google</Button>
        </div>
			</form>
		</div>
	);
}

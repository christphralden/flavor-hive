"use client"
import {Button} from '@components/ui/button';
import {InputLabelled} from '@components/ui/input-labelled';
import {useAuth} from '@hooks/useAuth';
import {FormPlaybook} from '@utils/form-utils';
import React from 'react';
import {useForm} from 'react-hook-form';

export default function LoginForm() {
	const {
		register:formRegister,
		handleSubmit,
		formState: {errors},
	} = useForm<UserLogin>();

	const {login} = useAuth();

	const submit = (data: UserLogin) => login(data);

	return (
		<form
			className="flex flex-col gap-8 justify-start"
			onSubmit={handleSubmit(submit)}
		>
			<div className="flex flex-col gap-4">
				<InputLabelled
					label="Email"
					type="email"
					placeholder="josex@gmail.com"
					{...formRegister('email', FormPlaybook.email)}
				>
					{errors.email && <p>{errors.email?.message}</p>}
				</InputLabelled>
				<InputLabelled
					label="Password"
					type="password"
					placeholder="Yellowmeowmeow:3"
					{...formRegister('password', FormPlaybook.password)}
				>
					{errors.password && <p>{errors.password?.message}</p>}
				</InputLabelled>
			</div>
			<div className="flex gap-4 w-full flex-col ">
				<Button
					className="w-full"
					type="submit"
				>
					Login
				</Button>
				<Button
					variant={'outline'}
					className="w-full"
				>
					Continue with Google
				</Button>
			</div>
		</form>
	);
}

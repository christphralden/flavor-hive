'use client';
import {Button} from '@components/ui/button';
import {InputLabelled} from '@components/ui/input-labelled';
import {AlertCircle, CheckInCircle} from '@geist-ui/icons';
import {register} from '@service/auth.service';
import { useRouter } from 'next/navigation';
import {useForm} from 'react-hook-form';
import { useMutation } from 'react-query';
import {toast} from 'sonner';
import { FormPlaybook } from '@utils/form-utils';

export default function RegisterForm() {
	const {
		register: formRegister,
		formState: {errors},
		handleSubmit,
        watch,
		reset,
	} = useForm<UserRegister>();

    const router = useRouter();

    const {mutate: handleRegister} = useMutation(register,
        {
            onSuccess:()=>{
                reset();
                toast('Registration successful!',{
                    description:'Please login to continue',
                });
                router.push('/login')
            },
            onError:(error:Error)=>{
                toast.error(error.message || 'An error occurred', {
                    icon: <AlertCircle className="h-full " />,
                });
            }
        }
    )

    const submit = (data:UserRegister) => handleRegister(data)

	return (
		<form
			className="w-full h-full flex flex-col gap-8"
            onSubmit={handleSubmit(submit)}
		>
			<div className="w-full gap-4 flex flex-col">
				<InputLabelled
					placeholder="josex@gmail.com"
					label="Email"
					type="email"
					className="text-black"
					{...formRegister('email', FormPlaybook.email)}
                    children={errors.email && <p>{errors.email?.message}</p>}
				/>
				<InputLabelled
					placeholder="Josex Tano"
					label="Name"
					type="text"
					className="text-black"
					{...formRegister('name', FormPlaybook.name)}
                    children={errors.name && <p>{errors.name?.message}</p>}
				/>
				<InputLabelled
					placeholder="ilovenilou"
					label="Username"
					type="text"
					className="text-black"
					{...formRegister('username', FormPlaybook.username)}
                    children={errors.username && <p>{errors.username?.message}</p>}
				/>
				<InputLabelled
					placeholder="Yellomeowmeow:3"
					label="Password"
					type="password"
					className="text-black"
					{...formRegister('password', FormPlaybook.password)}
                    children={errors.password && <p>{errors.password?.message}</p>}
				/>
				<InputLabelled
					placeholder="Yellomeowmeow:3"
					label="Confirm Password"
					type="password"
					className="text-black"
					{...formRegister('passwordConfirm', {
                        validate: (value:string) => value === watch('password') || "Passwords do not match"
                    })}
                    children={errors.passwordConfirm && <p>{errors.passwordConfirm?.message}</p>}
				/>
			</div>
			<div className="flex gap-4 w-full flex-col ">
				<Button
					className="w-full"
					type="submit"
				>
					Register
				</Button>
				<Button
					variant={'secondary'}
					className="w-full"
				>
					Continue with Google
				</Button>
			</div>
		</form>
	);
}

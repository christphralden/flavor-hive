'use client';
import {queryClient} from '@service/query';
import pb from '@service/pocketbase';
import {useMutation, useQuery} from 'react-query';
import React, {ReactNode, useContext, useState} from 'react';
import {RecordModel} from 'pocketbase';
import {login, logout, fetchData, register} from '@service/auth';
import {error} from 'console';
import { useRouter } from 'next/navigation';

interface AuthContextProviderProps {
	children: ReactNode;
}

export type AuthContextType = {
	user: User | null;
	login: (data: UserLogin) => any;
	logout: () => any;
	register: (user: UserRegister) => any;
	isLoading: boolean;
};

export const AuthContext = React.createContext<AuthContextType>({
	user: null,
	login: login,
	logout: logout,
	register: register,
	isLoading: false,
});

export default function AuthContextProvider({children}: AuthContextProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter()

	const {mutate: authLogin} = useMutation(login, {
		onSuccess: (data) => {
			if (data) {
				queryClient.invalidateQueries(['user']);
				router.push('/home')
			}
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const {mutate: authLogout} = useMutation(logout, {
		onSuccess: () => {
			setUser(null);
			queryClient.invalidateQueries(['user']);
			router.refresh()
		},
	});

	const {mutate: authRegister} = useMutation(register, {
		onSuccess: () => {
			queryClient.invalidateQueries(['user']);
			router.push('/login')
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const {isLoading} = useQuery(['user', pb.authStore.isValid], () => fetchData(), {
		onSuccess: (data: RecordModel) => {
			if (data) {
				setUser({
					id: data.id,
					email: data.email,
					avatar: data.avatar,
					username: data.username,
					name: data.name,
					verified: data.verified,
				});
			}
		},
		onError: (error) => {
			alert(error);
			//TODO:
		},
	});

	return (
		<AuthContext.Provider
			value={{
				isLoading,
				user,
				login: authLogin,
				logout: authLogout,
				register: authRegister,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

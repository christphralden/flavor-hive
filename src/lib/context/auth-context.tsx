'use client';
import pb, { PB_KEYS } from '@service/pocketbase';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import React, {ReactNode,  useState} from 'react';
import {RecordModel} from 'pocketbase';
import {fetchData, register} from '@service/auth';
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
	login: ()=>{},
	logout: ()=>{},
	register: ()=>{},
	isLoading: false,
});

export default function AuthContextProvider({children}: AuthContextProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter()
	const queryClient = useQueryClient()

	const {mutate: authLogin} = useMutation(async (data:UserLogin)=>{
		const auth = await pb.collection(PB_KEYS.PB_USERS_COLLECTION).authWithPassword(data.email, data.password);
		return auth
	}, {
		onSuccess: (data) => {
			if (data) {
				document.cookie = pb.authStore.exportToCookie({
					httpOnly:false,
					maxAge:24*60*60,
					path:'/',
				}),
				queryClient.invalidateQueries(['user']);
				router.push('/home')
			}
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const {mutate: authLogout} = useMutation(async()=>{
		pb.authStore.clear();
		document.cookie = pb.authStore.exportToCookie({
			httpOnly:false,
			maxAge:24*60*60,
			path:'/',
		})
	}, {
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
			console.log(pb.authStore.isValid)
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
			console.error(error);
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

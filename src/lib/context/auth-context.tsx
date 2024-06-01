'use client';
import pb, { PB_KEYS } from '@service/pocketbase.service';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import React, {ReactNode, useState} from 'react';
import {RecordModel} from 'pocketbase';
import {fetchData} from '@service/auth.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AlertCircle } from '@geist-ui/icons'


interface AuthContextProviderProps {
	children: ReactNode;
}

export type AuthContextType = {
	user: User | null;
	login: (data: UserLogin) => any;
	logout: () => any;
	isLoading: boolean;
};

export const AuthContext = React.createContext<AuthContextType>({
	user: null,
	login: ()=>{},
	logout: ()=>{},
	isLoading: false,
});

export default function AuthContextProvider({children}: AuthContextProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter()
	const queryClient = useQueryClient()

	const {mutate: authLogin} = useMutation(async (data:UserLogin)=>{
		const auth = await pb.collection(PB_KEYS.USERS).authWithPassword(data.email, data.password);
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
				router.refresh();
			}
		},
		onError: (error:any) => {
			toast.error(error.message,{
				icon:<AlertCircle className='w-full'/>
			})
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
			console.log('run')
			setUser(null);
			queryClient.invalidateQueries(['user']);
			router.refresh()
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
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

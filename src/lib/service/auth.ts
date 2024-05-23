'use server';
import pb, {PB_KEYS} from '@service/pocketbase';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { usePathname } from 'next/navigation';

async function login(data: UserLogin) {
	try {
		const auth = await pb.collection(PB_KEYS.PB_USERS_COLLECTION).authWithPassword(data.email, data.password);

		cookies().set({
			name:PB_KEYS.PB_AUTH_TOKEN,
			value: pb.authStore.exportToCookie(),
			httpOnly: true,
			path:'/'
		})

		return auth
	} catch (error) {
		throw error;
	}
}

async function fetchData() {
	const cookieStore = cookies();
	const cookieAuth = cookieStore.get(PB_KEYS.PB_AUTH_TOKEN);
	cookieAuth && (await pb.authStore.loadFromCookie(cookieAuth.value))
	const pbAuth = pb.authStore.model;
	if (pbAuth) {
		return await pb.collection(PB_KEYS.PB_USERS_COLLECTION).getOne(pbAuth.id);
	}
}

async function register(user: UserRegister) {
	try {
		return await pb.collection(PB_KEYS.PB_USERS_COLLECTION).create(user);
	} catch (error) {
		throw error
	}
}

async function logout() {
	pb.authStore.clear();
	cookies().set({
		name: PB_KEYS.PB_AUTH_TOKEN,
		value: pb.authStore.exportToCookie(),
		httpOnly: true,
		path: '/',
	});

	//redirect di client
}

export {login, logout, fetchData, register};

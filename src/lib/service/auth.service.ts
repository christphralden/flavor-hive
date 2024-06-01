"use server"
import pb, {PB_KEYS} from '@service/pocketbase.service';
import { parseCookie } from '@utils/cookie-utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { RecordModel } from 'pocketbase';

/*
in-depth: https://github.com/pocketbase/js-sdk#authstore, baca yg nextjs
*/

async function fetchData():Promise<RecordModel|undefined> {
	const cookieStore = cookies();
	const cookieAuth = cookieStore.get(PB_KEYS.AUTH_TOKEN);
	const parsedCookie = await parseCookie(cookieAuth)
	cookieAuth && (await pb.authStore.loadFromCookie(parsedCookie))
	const pbAuth = pb.authStore.model;
	if (pbAuth) {
		return await pb.collection(PB_KEYS.USERS).getOne(pbAuth.id);
	}
}

async function register(data: UserRegister): Promise<any> {
	const user:UserRegister={
		email:data.email.trim(),
		name:data.name.trim(),
		password:data.password.trim(),
		passwordConfirm:data.passwordConfirm.trim(),
		username:data.username.trim(),
		emailVisibility:true
	}
	try {
		await pb.collection(PB_KEYS.USERS).create(user);
		
	} catch (error:any) {
		throw error
	}finally{
		revalidatePath('/register')
	}
}


export { fetchData, register};

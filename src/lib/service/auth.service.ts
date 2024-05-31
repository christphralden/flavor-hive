"use server"
import pb, {PB_KEYS} from '@service/pocketbase.service';
import { parseCookie } from '@utils/cookie-utils';
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

async function register(formData:FormData) {
	let redirectPath;
	const user:UserRegister={
		email:formData.get('email') as string,
		name:formData.get('name') as string,
		password:formData.get('password') as string,
		passwordConfirm:formData.get('passwordConfirm') as string,
		username:formData.get('username') as string,
		emailVisibility:true
	}
	try {
		await pb.collection(PB_KEYS.USERS).create(user);
		redirectPath = '/login'
	} catch (error) {
		console.error(error)
	} finally {
		if(redirectPath){
			redirect("/login")
		}
	}
}


export { fetchData, register};

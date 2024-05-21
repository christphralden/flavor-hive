'use server';
import pb from '@service/pocketbase';

async function login(data: UserLogin) {
	try {
		return await pb.collection('users').authWithPassword(data.email, data.password);
	} catch (error) {
		throw error;
	}
}

async function fetchData() {
	const auth = await pb.authStore.model;
	if (auth) {
		return await pb.collection('users').getOne(auth.id, {
			// expand: 'relField1,relField2.subRelField', => additional
		});
	}
}

async function register(user: UserRegister) {
	try {
		return await pb.collection('users').create(user);
	} catch (error) {
		throw error
	}
}

async function logout() {
	pb.authStore.clear();
}

export {login, logout, fetchData, register};

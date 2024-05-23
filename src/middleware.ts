import pb, { PB_KEYS } from '@service/pocketbase';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const cookieStore = cookies()
    const cookieAuth = cookieStore.get(PB_KEYS.PB_AUTH_TOKEN);
    const response = NextResponse.next();
    
    if (cookieAuth) {
        try {
            await pb.authStore.loadFromCookie(cookieAuth.value);
        } catch (error) {
            pb.authStore.clear();
			cookieStore.set({
				name: PB_KEYS.PB_AUTH_TOKEN,
				value: pb.authStore.exportToCookie(),
				httpOnly: true,
				path: '/',
			});
        }

        try {
            if (pb.authStore.isValid) {
                await pb.collection(PB_KEYS.PB_USERS_COLLECTION).authRefresh();
            }
        } catch (error) {
            pb.authStore.clear();
            cookieStore.set({
                name: PB_KEYS.PB_AUTH_TOKEN,
                value: pb.authStore.exportToCookie(),
                httpOnly: true,
                path: '/',
            });
        }
    }

    if (!pb.authStore.isValid && !request.nextUrl.pathname.startsWith('/login')) {
        const redirect_to = new URL('/login', request.url);
        redirect_to.search = new URLSearchParams({
            next: request.nextUrl.pathname,
        }).toString();
        return NextResponse.redirect(redirect_to);
    }

    if (pb.authStore.model && request.nextUrl.pathname.startsWith('/login')) {
        const next_url = request.headers.get('next-url') as string;
        if (next_url) {
            const redirect_to = new URL(next_url, request.url);
            return NextResponse.redirect(redirect_to);
        }
        const redirect_to = new URL(`/home`, request.url);
        return NextResponse.redirect(redirect_to);
    }

    return response;
}

export const config = {
    matcher: ["/home/:path*", "/login"],
};
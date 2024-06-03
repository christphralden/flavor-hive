import pb, { PB_KEYS } from '@service/pocketbase.service';
import { parseCookie } from '@utils/cookie-utils';

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const cookieAuth = request.cookies.get(PB_KEYS.AUTH_TOKEN)
    const parsedCookie = await parseCookie(cookieAuth)
    const response = NextResponse.next();
    
    if (cookieAuth) {
        try {
            await pb.authStore.loadFromCookie(parsedCookie);
        } catch (error) {
            pb.authStore.clear();
			response.headers.set(
                "Set-Cookie",
                pb.authStore.exportToCookie({ httpOnly: false })
            );
        }
    }
    else{
        try {
            if (pb.authStore.isValid) {
                await pb.collection(PB_KEYS.USERS).authRefresh();
                response.headers.set(
                    "Set-Cookie",
                    pb.authStore.exportToCookie({ httpOnly: false })
                );
            }
        } catch (error) {
            pb.authStore.clear();
            response.headers.set(
                "Set-Cookie",
                pb.authStore.exportToCookie({ httpOnly: false })
            );
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
        const referer = new Headers(request.headers).get('referer') as string
        const url = new URL(referer, request.url)  
        const nextPath =  url.searchParams.get('next')
        if (nextPath) {
            const redirectTo = new URL(nextPath, request.url); //TODO: ini masih agak goofy kl di refresh
            return NextResponse.redirect(redirectTo);
        }
        const redirectTo = new URL(`/home`, request.url);
        return NextResponse.redirect(redirectTo);
    }

    return response;
}

export const config = {
    matcher: ["/home/:path*", "/login/:path*","/restaurant/:path*","/profile/:path*"],
};
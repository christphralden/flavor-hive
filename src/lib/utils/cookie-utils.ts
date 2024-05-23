import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export async function getCookie(request: RequestCookie | undefined): Promise<string> {
    const cookie = { pb_auth: request?.value || '' }
      let encodedCookie = ''
      for (const [key, value] of Object.entries(cookie)) {
        encodedCookie += `${encodeURIComponent(key)}=${encodeURIComponent(
          value,
        )}; `
      }
    return encodedCookie;
}
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    const allCookies = request.cookies.getAll();
    const tokenCookie = request.cookies.get('token');
    // console.log('request.headers', request.headers);
    // console.log('allCookies', allCookies);
    // console.log('tokenCookie', tokenCookie);

    // const requestHeaders = new Headers(request.headers)

    const response = NextResponse.next();
    const ResponseCookies = response.cookies;
    // console.log('response', response);
    // console.log('ResponseCookies.get("token")', ResponseCookies.get('token'));
    return response;
  }
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  // let cookie = request.cookies.get('session');
  // console.log('session cookie', cookie);

  // console.log('allCookies', allCookies);

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  // response.cookies.set('vercel', 'fast')
  // response.cookies.set({
  //   name: 'vercel',
  //   value: 'fast',
  //   path: '/',
  // })
  // cookie = response.cookies.get('vercel')
  // console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.

  return response;
}

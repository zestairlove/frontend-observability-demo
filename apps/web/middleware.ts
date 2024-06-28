import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get('session');
  //console.log('session cookie', cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll();
  //console.log('allCookies', allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  //console.log('request', request);

  const body = Buffer.from(cookie?.value || '', 'base64').toString('utf8');
  const bodyJson = JSON.parse(body);

  // @ts-ignore
  request.session = { jwt: bodyJson.jwt };
  // @ts-ignore
  //console.log('request.session', request.session);

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

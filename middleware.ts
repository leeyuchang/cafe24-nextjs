import * as jose from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { Token } from './utils';

const isExpired = (date: string) => {
  return Date.now() > JSON.parse(date).expiredAt;
};

// Enable theme
// ...
/**
 * 미들웨어 공부 방법
 * @param request
 * @returns
 */
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname.endsWith('/login')) {
    const response = NextResponse.redirect(url.origin + '/login');
    response.cookies.delete('access_token');
    return response;
  }

  const token = request.cookies.get('access_token');

  if (!token) return NextResponse.next();

  try {
    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) throw Error('NotFound JWT_SECRET');
    const encodedSecretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, encodedSecretKey);

    const userId = payload.userId as number;
    const userName = payload.userName as string;

    const now = Math.floor(Date.now() / 1_000);
    let newToken = null;
    if (payload.exp! - now < 60 * 60 * 24 * 3.5) {
      newToken = await Token.generate({ userId, userName });
    }

    console.log('===> middleware ', userId);
    console.log('===> middleware ', userName);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('state', JSON.stringify({ user: { userId, userName } }));

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (error) {
    console.log('===> error ', error);
    return NextResponse.rewrite(new URL('/login', request.url));
  }
}

/**
 * 미들웨어 적용방법
 * 아래와 같이 config로 지정한다.
 */
export const config = {
  matcher: '/api/:path*',
};

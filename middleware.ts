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
  const auth = request.headers.get('authorization');

  console.log('===> auth ', auth);

  if (!auth) {
    return NextResponse.next();
  }

  console.log('===> 혹시 여기 또 들어오는가???');

  try {
    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) throw Error('NotFound JWT_SECRET');
    const encodedSecretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(auth, encodedSecretKey);

    const userId = payload.userId as number;
    const userName = payload.userName as string;

    const now = Math.floor(Date.now() / 1_000);
    let newToken = null;
    if (payload.exp! - now < 60 * 60 * 24 * 3.5) {
      newToken = await Token.generate({ userId, userName });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'ERR_JWS_INVALID' }),
      { status: 401, headers: { 'content-type': 'application/json' } },
    );
  }
}

/**
 * 미들웨어 적용방법
 * 아래와 같이 config로 지정한다.
 */
export const config = {
  matcher: '/api/:path*',
};

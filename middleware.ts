import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
import { Token } from "./utils";

// Enable theme
// ...
/**
 * 미들웨어 공부 방법
 * @param request
 * @returns
 */
export async function middleware(request: NextRequest) {

  const token = request.cookies.get("access_token");
  if (!token) return NextResponse.next();

  try {
    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) throw Error("NotFound JWT_SECRET");
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    const userId = payload.userId as number;
    const userName = payload.userName as string;

    const now = Math.floor(Date.now() / 1_000);
    let newToken = null;
    if (payload.exp! - now < 60 * 60 * 24 * 3.5) {
      newToken = await Token.generate({ userId, userName });
    }

    return NextResponse.next({
      request: { ...request, ...{ state: { userId, userName } } },
    });
  } catch (error) {
    return NextResponse.redirect("/login");
  }
}

/**
 * 미들웨어 적용방법
 * 아래와 같이 config로 지정한다.
 */
export const config = {
  matcher: "/api/:path*",
};

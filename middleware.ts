import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
import { CustomRequest } from "./pages/api/auth/login";

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
    if (!process.env.JWT_SECRET) throw Error("NotFound JWT_SECRET");
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const userId = payload.userId as number;
    const userName = payload.userName as string;

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

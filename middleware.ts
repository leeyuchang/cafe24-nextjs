import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
import { Token } from "./utils";

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
  // const currentUser = request.cookies.get("currentUser")?.valueOf();

  // const { pathname } = request.nextUrl;

  // if (["/loging"].includes(pathname) && (!currentUser || isExpired(""))) {
  //   request.cookies.get("currentUser");
  //   const response = NextResponse.rewrite(new URL("/login", request.url));
  //   response.cookies.delete("currentUser");
  //   return response;
  // }

  // if (["/profile"].includes(pathname) && currentUser) {
  //   const response = NextResponse.rewrite(new URL("/profile", request.url));
  //   return response;
  // }

  const token = String(request.cookies.get("access_token")).valueOf();
  // console.log("===> token ", token);

  // if (!token) return NextResponse.next();

  // console.log("===> passed ");

  try {
    // const { JWT_SECRET } = process.env;

    // if (!JWT_SECRET) throw Error("NotFound JWT_SECRET");
    // const { payload } = await jose.jwtVerify(
    //   token,
    //   new TextEncoder().encode(JWT_SECRET)
    // );

    // const userId = payload.userId as number;
    // const userName = payload.userName as string;

    // const now = Math.floor(Date.now() / 1_000);
    // let newToken = null;
    // if (payload.exp! - now < 60 * 60 * 24 * 3.5) {
    //   newToken = await Token.generate({ userId, userName });
    // }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("session", "hello world");

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.log("===> error ", error);

    return NextResponse.rewrite(new URL("/login", request.url));
  }
}

/**
 * 미들웨어 적용방법
 * 아래와 같이 config로 지정한다.
 */
// export const config = {
//   matcher: "/api/:path*",
// };

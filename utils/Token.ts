import * as jose from "jose";

export default class Token {
  // constructor() {}

  static async generate({
    userId,
    userName,
  }: {
    userId: number;
    userName: string;
  }) {
    const jwtToken = await new jose.SignJWT({ userId, userName })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return jwtToken;
  }
}

import * as jose from "jose";

type CheckPassword = {
  password: string;
  hashedPassword: string;
};
export default class Token {
  // constructor() {}

  static async generate({
    userId,
    userName,
  }: {
    userId: number;
    userName: string;
  }) {
    return await new jose.SignJWT({ userId, userName })
      .setProtectedHeader({ typ: "JWT", alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("5s")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  }
}

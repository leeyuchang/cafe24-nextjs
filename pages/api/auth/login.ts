import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

import { Token } from "../../../utils";

const prisma = new PrismaClient();

export interface CustomRequest extends NextApiRequest {
  userId: number;
  userName: string;
}

export default async function login(req: CustomRequest, res: NextApiResponse) {
  console.log("중요 합니다. ===> ", req);

  if (req.method === "POST") {
    const { username, password } = req.body;

    // username, password가 없으면 에러처리
    if (!username || !password) {
      return res.status(401).end();
    }

    try {
      const user = await prisma.user.findFirstOrThrow({
        where: { username },
        select: { id: true, username: true },
      });
      const token = await Token.generate({
        userId: user.id,
        userName: username,
      });
      res.setHeader(
        "Set-Cookie",
        `access_token=${token};maxAge=${
          1000 * 60 * 60 * 24 * 7
        };path=/;httpOnly: true;`
      );

      return res.status(200).send(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(401).end();
      }
      return res.status(500).end();
    }
  }
}

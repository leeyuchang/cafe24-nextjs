import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const schema = Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(20).required(),
      password: Joi.string().required(),
    });

    // 입력값 검증
    const result = schema.validate(req.body);

    // 검증에 실패 했다면
    if (result.error) {
      return res.status(400).send(result.error);
    }

    const { username, password } = req.body;

    try {
      const exists = await prisma.user.findFirst({ where: { username } });

      // 중복 있다면
      if (exists) return res.status(409).end();

      // 사용자 저장
      // await prisma.user.create({
      //   data: { username, hashedPassword: password },
      //   select: { username: true },
      // });
      return res.status(201).end();
    } catch {
      return res.status(500).end();
    }
  }
}

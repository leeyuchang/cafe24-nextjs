import { NotFoundError } from '@prisma/client/runtime';
import { NextApiRequest, NextApiResponse } from 'next';

import { Token } from '../../../utils';
import prisma from '../../../lib/prisma';

export default async function refresh(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { username } = req.body;

    // username, password가 없으면 에러처리
    // if (!username || !password) {
    //   return res.status(401).end();
    // }

    try {
      // 사용자 정보를 찾는다.
      // const user = await prisma.user.findFirstOrThrow({
      //   where: { username },
      //   select: { id: true, username: true },
      // });

      const user = await prisma.user.findFirstOrThrow({ where: { username } });

      // 사용자 정보로 토큰을 만든다.
      const token = await Token.generate({
        userId: user.id,
        userName: username,
      });

      // 쿠키 생성
      // TODO 쿠키옵션 필요
      // const cookies: string[] = [];
      // cookies.push(["access_token", token].join("="));

      // 응답 헤더에 쿠키
      // res.setHeader("Set-Cookie", cookies.join(";"));

      // 응답을 리턴한다.

      return res
        .status(200)
        .send({ accessToken: token, refreshToken: token });
    } catch (error) {
      // 사용자가 없다면 401에러
      if (error instanceof NotFoundError) {
        return res.status(401).end();
      }

      // 그 밖에 모든 에러는 500에러
      return res.status(500).end();
    }
  }
}

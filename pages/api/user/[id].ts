import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const foundUser = await prisma.user.findUniqueOrThrow({
        where: { id: Number(req.query.id) },
        include: { accounts: { include: { bank: true } } },
      });
      return res.status(200).send(foundUser);
    } catch (error) {
      console.log('===> error ', error);
      return res.status(400).send('Not Found Excetion????');
    }
  }
  if (req.method === 'POST') {
    const { password, email, name } = req.body;

    try {
      // 사용자 정보를 찾는다.
      // const user = await prisma.user.findFirstOrThrow({
      //   where: { username },
      //   select: { id: true, username: true },
      // });
      // // 사용자 정보로 토큰을 만든다.
      // const token = await Token.generate({
      //   userId: user.id,
      //   userName: username,
      // });
      // // 쿠키 생성
      // // TODO 쿠키옵션 필요
      // const cookies: string[] = [];
      // cookies.push(["access_token", token].join("="));
      // // 응답 헤더에 쿠키
      // res.setHeader("Set-Cookie", cookies.join(";"));
      // // 응답을 리턴한다.
      // return res.status(200).send(user);
    } catch (error) {
      console.log('===> error ', error);

      // 그 밖에 모든 에러는 500에러
      return res.status(500).end();
    }
  }
}

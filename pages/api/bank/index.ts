import { NextApiRequest, NextApiResponse } from 'next';
// import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
// import { authOptions } from '../auth/[...nextauth]';

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const found = await prisma.bank.findMany();
      return res.status(200).send(found);
    } catch (error) {
      console.log('===> error ', error);
      return res.status(500).end();
    }
  }

  if (req.method === 'POST') {
    // const session = await getServerSession(req, res, authOptions);

    const { name, phone, location } = req.body;

    try {
      const created = await prisma.bank.create({
        data: { name, phone, location },
      });

      return res.status(201).send(created);
    } catch (error) {
      // 그 밖에 모든 에러는 500에러
      return res.status(500).end();
    }
  }
}

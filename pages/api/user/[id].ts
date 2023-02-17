import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const foundUser = await prisma.user.findUnique({
        where: { id: Number(req.query.id) },
        include: { accounts: { include: { bank: true } } },
      });
      return res.status(200).send(foundUser);
    } catch (error) {
      console.error(error);
      return res.status(404).send('Not Found Excetion????');
    }
  }
  if (req.method === 'POST') {
  }
}

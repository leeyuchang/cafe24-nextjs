import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { password, email, name, role } = req.body;

    try {
      const created = await prisma.user.create({
        data: { password, email, name, role },
      });
      return res.status(201).send(created);
    } catch (error) {
      console.error('===> error ', error);
      return res.status(500).end();
    }
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { password, email, name } = req.body;

    try {
    } catch (error) {
      // 그 밖에 모든 에러는 500에러
      return res.status(500).end();
    }
  }
}

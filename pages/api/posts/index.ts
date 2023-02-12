import { Tag } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export type Req = {
  title: string;
  body: string;
  tags: string[];
  userId: number;
};

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  console.log('===> session ', session);

  if (req.method === 'POST') {
    const { title, body, tags } = req.body as Req;
    const state = JSON.parse(String(req.headers.state).valueOf());
    console.log('===> state ', state);

    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          body,
          tags: {
            create: tags.map((tag) => ({ content: tag } as Tag)),
          },
          userId: state.user.userId,
        },
      });

      const found = prisma.post.findUnique({
        where: { id: newPost.id },
        include: { tags: true, user: true },
      });

      return res.status(201).send(found);
    } catch {
      res.status(500);
    }
  }

  if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        include: { tags: true, _count: true },
      });
      return res.status(200).send(posts);
    } catch (error) {
      return res.status(500);
    }
  }
};

export default index;

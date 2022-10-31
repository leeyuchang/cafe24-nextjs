import { Tag } from ".prisma/client";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export type Req = {
  title: string;
  body: string;
  tags: string[];
};

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { title, body, tags } = req.body as Req;

    try {
      await prisma.post.create({
        data: {
          title,
          body,
          tags: {
            create: tags.map((tag) => ({ content: tag } as Tag)),
          },
        },
      });
    } catch (error) {
      res.status(500);
    }
    res.status(200).send({ msg: "hello" });
  }

  if (req.method === "GET") {
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

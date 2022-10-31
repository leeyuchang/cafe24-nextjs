import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Req } from ".";

const prisma = new PrismaClient();

export default async function read(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as unknown as { id: number };

  if (!id) {
    return res.status(400).end();
  }

  if (req.method === "GET") {
    try {
      const post = await prisma.post.findUnique({ where: { id: Number(id) } });
      if (!post) {
        return res.status(404).end();
      }
      return res.status(200).send(post);
    } catch (error) {
      return res.status(500).end();
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.post.delete({ where: { id: Number(id) } });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).end();
    }
  }

  if (req.method === "PATCH") {
    const { body, title } = req.body as Req;

    try {
      await prisma.post.update({
        where: { id: Number(id) },
        data: {
          ...(body && { body }),
          ...(title && { title }),
        },
      });

      return res.status(201).end();
    } catch (error) {
      return res.status(500).end();
    }
  }
}

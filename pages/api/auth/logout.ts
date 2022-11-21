import { NextApiResponse, NextApiRequest } from "next";

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return res.setHeader("Set-Cookie", "").end();
  }
}

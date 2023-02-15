import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const calcTax = ({
  totalAmount,
  taxRate,
}: {
  totalAmount: number;
  taxRate: string;
}) => {
  return totalAmount;
};
const calcInterest = ({
  totalAmount,
  interestRate,
}: {
  totalAmount: number;
  interestRate: string;
}) => {
  // return totalAmount * interestRate * 100;
  return totalAmount;
};

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    // if (!session?.user.id) throw new Error('');

    const {
      bankId,
      name,
      accountNumber,
      startDate,
      endDate,
      interestRate,
      totalAmount,
      taxRate,
    } = req.body;

    console.log('===> req.body ', req.body);

    try {
      const foundBank = await prisma.bank.findUnique({ where: { id: bankId } });

      if (!foundBank) throw new Error();

      const created = await prisma.account.create({
        data: {
          bankId,
          name,
          accountNumber,
          startDate,
          endDate,
          interest: calcInterest({ totalAmount, interestRate }),
          interestRate,
          totalAmount,
          tax: calcTax({ totalAmount, taxRate }),
          taxRate,
          userId: session?.user.id!,
        },
      });

      return res.status(201).send(created);
    } catch (error) {
      console.log('===> error ', error);
      return res.status(500).end();
    }
  }
}

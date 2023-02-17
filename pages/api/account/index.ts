import differenceInMonths from 'date-fns/differenceInMonths';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const calcTax = ({
  interest,
  taxRate,
}: {
  interest: number;
  taxRate: number;
}) => {
  const tax = (interest * taxRate) / 100;

  // 원단위 절사
  // 원단위의 경우 10, 십원단위의 경우 100, 백원단위의 경우 1000, ... 을 이용하면 원단위 절사가 가능하다.
  const result = Math.floor(tax / 10) * 10;

  return result;
};
const calcInterest = ({
  totalAmount,
  interestRate,
  startDate,
  endDate,
}: {
  totalAmount: number;
  interestRate: number;
  startDate: Date;
  endDate: Date;
}) => {
  const difference = differenceInMonths(new Date(endDate), new Date(startDate));

  // 이자
  const totalInterest =
    Number(totalAmount) * (Number(interestRate) / 100) * (difference / 12);

  // 원단위 절사
  // 원단위의 경우 10, 십원단위의 경우 100, 백원단위의 경우 1000, ... 을 이용하면 원단위 절사가 가능하다.
  const result = Math.floor(totalInterest / 10) * 10;

  return result;
};

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      bankId,
      userId,
      name,
      accountNumber,
      startDate,
      endDate,
      interestRate,
      totalAmount,
      taxRate,
    } = req.body;

    try {
      if (
        !bankId ||
        !userId ||
        !name ||
        !accountNumber ||
        !startDate ||
        !endDate ||
        !interestRate ||
        !totalAmount ||
        !taxRate
      ) {
        return res.status(400).send('required param');
      }

      // 이자 구하는 함수
      const interest = calcInterest({
        startDate,
        endDate,
        interestRate,
        totalAmount,
      });

      console.log('===> 이자 ', interest);

      // 세금 구하는 함수
      const tax = calcTax({ interest, taxRate });

      console.log('===> 세금 ', tax);

      // 만기 금액
      const maturityAmount = Number(totalAmount) + interest - tax;

      const created = await prisma.account.create({
        data: {
          bankId,
          userId,
          name,
          accountNumber,
          startDate,
          endDate,
          interest, // 이자금액
          interestRate, // 이자율
          totalAmount: Number(totalAmount), // 원금
          maturityAmount, // 만기금액
          tax, // 세금
          taxRate,
        },
      });

      return res.status(201).send(created);
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  }
}

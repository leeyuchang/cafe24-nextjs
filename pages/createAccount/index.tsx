import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import client from '../../lib/client';
import prisma from '../../lib/prisma';

export default function Index(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [taxRate, setTaxRate] = useState<string>('');
  const [bankId, setBankId] = useState<number | null>(
    props.banks[0]?.id ?? null,
  );
  const [customerId, setCustomerId] = useState<number | null>(
    props.customers[0]?.id ?? null,
  );

  const isValidated = () => {
    if (
      !name ||
      !accountNumber ||
      !startDate ||
      !endDate ||
      !interestRate ||
      !totalAmount ||
      !taxRate ||
      !bankId
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidated()) return;

    try {
      await client.post('/api/account', {
        bankId,
        userId: customerId,
        name,
        accountNumber,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        interestRate,
        totalAmount,
        taxRate,
      });
      toast.success('성공');
      setTimeout(() => router.back(), 1_500);
    } catch (error) {
      console.error(error);
      toast.error('실패');
    }
  };

  return (
    <div className="p-10">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Listbox value={customerId} onChange={setCustomerId}>
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700">
              고객명
            </label>
            <Listbox.Button className="mt-1 relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border-gray-300">
              <span className="block truncate">
                {
                  props.customers.find((customer) => customer.id === customerId)
                    ?.name
                }
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.customers.map((customer) => (
                <Listbox.Option
                  key={customer.id}
                  value={customer.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                >
                  {customer.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
        <Listbox value={bankId} onChange={setBankId}>
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700">
              은행명
            </label>
            <Listbox.Button className="mt-1 relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border-gray-300">
              <span className="block truncate">
                {props.banks.find((bank) => bank.id === bankId)?.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.banks.map((bank) => (
                <Listbox.Option
                  key={bank.id}
                  value={bank.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                >
                  {bank.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-bold text-gray-700"
          >
            통장명
          </label>
          <div className="mt-1">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              autoComplete="Username"
              name="name"
              id="name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="accountNumber"
            className="block text-sm font-bold text-gray-700"
          >
            계좌번호
          </label>
          <div className="mt-1">
            <input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              type="text"
              name="accountNumber"
              id="accountNumber"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-bold text-gray-700"
          >
            개설일
          </label>
          <div className="mt-1">
            <input
              value={(startDate || '').toString().substring(0, 16)}
              onChange={(e) => {
                if (!e.target['validity'].valid) return;
                // const dt = e.target['value'] + ':00Z';
                const dt = e.target['value'];
                setStartDate(dt);
              }}
              type="date"
              name="startDate"
              id="startDate"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-bold text-gray-700"
          >
            만기일
          </label>
          <div className="mt-1">
            <input
              value={(endDate || '').toString().substring(0, 16)}
              onChange={(e) => {
                if (!e.target['validity'].valid) return;
                // const dt = e.target['value'] + ':00Z';
                const dt = e.target['value'];
                setEndDate(dt);
              }}
              type="date"
              name="endDate"
              id="endDate"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="interestRate"
            className="block text-sm font-bold text-gray-700"
          >
            이자율
          </label>
          <div className="mt-1">
            <input
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              type="text"
              name="interestRate"
              id="interestRate"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0.00%"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="totalAmount"
            className="block text-sm font-bold text-gray-700"
          >
            총금액
          </label>
          <div className="mt-1">
            <input
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              type="text"
              name="totalAmount"
              id="totalAmount"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="taxRate"
            className="block text-sm font-bold text-gray-700"
          >
            세금율
          </label>
          <div className="mt-1">
            <input
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              type="text"
              name="taxRate"
              id="taxRate"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0.00%"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="border-2 border-gray-400 px-2 py-1 rounded"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}

type ServerSideRetrun = {
  banks: { id: number; name: string }[];
  customers: { id: number; name: string }[];
};

export const getServerSideProps: GetServerSideProps<
  ServerSideRetrun
> = async () => {
  const banks = await prisma.bank.findMany({
    select: { id: true, name: true },
  });

  const customers = await prisma.user.findMany({
    where: { role: 'MEMBER' },
    select: { id: true, name: true },
  });

  return { props: { banks, customers } };
};

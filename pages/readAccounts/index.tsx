import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import client from '../../lib/client';
import Page from '../../navigation';
import { User } from '../../types/types';
import { authOptions } from '../api/auth/[...nextauth]';

export default function Index(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  if (props.user.role === 'ADMIN') {
    return (
      <div className='flex items-center justify-center h-screen w-screen'>
        <div className="flex flex-col gap-5 font-semibold">
          <div>
            <Link href={Page.createCustomer}>사용자 생성</Link>
          </div>
          <div>
            <Link href={Page.createBank}>은행 생성</Link>
          </div>
          <div>
            <Link href={Page.createAccount}>계좌 생성</Link>
          </div>
          <button
            className="border-2 rounded h-10 px-2 y-1"
            onClick={() => signOut()}
          >
            나가기
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">사용자</h1>
          <div className="flex gap-3">
            <p className="mt-2 text-base text-gray-700">{props.user.name}</p>
            <button
              className="border-2 rounded h-10 px-2 y-1"
              onClick={() => signOut()}
            >
              나가기
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 overflow-x-auto">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-base font-semibold text-gray-900 sm:pl-6"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-base font-semibold text-gray-900"
                    >
                      은행
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-base font-semibold text-gray-900"
                    >
                      예금명
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-base font-semibold text-gray-900"
                    >
                      개설일
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-base font-semibold text-gray-900"
                    >
                      만기일
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-base font-semibold text-gray-900"
                    >
                      계좌번호
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-base font-semibold text-gray-900"
                    >
                      원금(원)
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-base font-semibold text-gray-900"
                    >
                      금리(%)
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-base font-semibold text-gray-900"
                    >
                      세금(%)
                    </th>
                    <th
                      scope="col"
                      className="pl-4 py-3.5 pr-4 text-left text-base font-semibold text-gray-900"
                    >
                      만기금액
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white overflow-y-auto">
                  {props.user.accounts?.map((account, index) => (
                    <tr
                      key={account.accountNumber}
                      className="divide-x divide-gray-200"
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-base font-medium text-gray-900 sm:pl-6">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap p-4 text-base text-gray-500">
                        {account.bank.name}
                      </td>
                      <td className="whitespace-nowrap p-4 text-base text-gray-500">
                        {account.name}
                      </td>
                      <td className="whitespace-nowrap p-4 text-base text-gray-500">
                        {new Date(account.startDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap p-4 text-base text-gray-500">
                        {new Date(account.endDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap p-4 text-base text-gray-500">
                        {account.accountNumber}
                      </td>
                      <td className="whitespace-nowrap p-4 text-base text-gray-500 text-right">
                        {new Intl.NumberFormat().format(account.totalAmount)}
                      </td>
                      <td className="whitespace-nowrap p-4 text-base text-gray-500">
                        {account.interestRate}
                      </td>
                      <td className="whitespace-nowrap p-4 text-base text-gray-500">
                        {account.taxRate}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-base text-gray-500 sm:pr-6 text-right">
                        {new Intl.NumberFormat().format(account.maturityAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ServerSideRetrun = {
  user: User;
};

export const getServerSideProps: GetServerSideProps<ServerSideRetrun> = async ({
  req,
  res,
}) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { data } = await client.get<User>(`/api/user/${session.user.id}`);
    return { props: { user: data } };
  }

  return {
    redirect: {
      permanent: false,
      destination: Page.login,
    },
    props: {},
  };
};

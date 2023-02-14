import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import client from '../../lib/client';
import { User } from '../../types/types';
import { authOptions } from '../api/auth/[...nextauth]';

const projects = [
  {
    id: 1,
    name: 'New Advertising Campaign',
    hours: '12.0',
    rate: '$75.00',
    price: '$900.00',
  },
  // More projects...
];

export default function Index(
  session: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  if (!session.data) return;

  const { accounts } = session.data;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">사용자</h1>
          <div className='flex gap-3'>
            <p className="mt-2 text-base text-gray-700">{session.user.name}</p>
            <button
              className="border-2 rounded h-10 px-2"
              onClick={() => signOut()}
            >
              Sign out
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
                  {accounts.map((account, index) => (
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
                      <td className="whitespace-nowrap p-4 text-base text-gray-500">
                        {new Intl.NumberFormat().format(account.totalAmount)}
                      </td>
                      <td className="whitespace-nowrap p-4 text-base text-gray-500">
                        {account.interestRate}
                      </td>
                      <td className="whitespace-nowrap p-4 text-base text-gray-500">
                        {account.taxRate}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-base text-gray-500 sm:pr-6">
                        {new Intl.NumberFormat().format(
                          account.totalAmount + 50000,
                        )}
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
  user: {
    address: string | undefined;
    email: string | undefined;
    image: string | undefined;
    name: string | undefined;
    role: string | undefined;
  };
  expires: string;
  data: User;
};

export const getServerSideProps: GetServerSideProps<ServerSideRetrun> = async ({
  req,
  res,
}) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return { redirect: { permanent: false, destination: '/auth' } };
    const { data } = await client.get<User>(`/api/user/${session.user.id}`);
    return { props: { ...session, data } as ServerSideRetrun };
  } catch (error) {
    console.log('===> error ', error);
  }

  return { props: {} as ServerSideRetrun };
};

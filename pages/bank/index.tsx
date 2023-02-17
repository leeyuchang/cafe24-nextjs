import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useState } from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import client from '../api/client';

export default function Index() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="p-10">
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await client.post('/api/bank', { name, phone, location });
          } catch (error) {
            console.error(error);
          } finally {
            setName('');
            setPhone('');
            setLocation('');
          }
        }}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            은행명
          </label>
          <div className="mt-1">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            전화번호
          </label>
          <div className="mt-1">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              name="phone"
              id="phone"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            위치
          </label>
          <div className="mt-1">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              name="location"
              id="location"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="border-2 border-gray-400 p-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return { props: {} };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/auth',
    },
    props: {},
  };
};

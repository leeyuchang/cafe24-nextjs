import { createHash } from 'crypto';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import client from '../../lib/client';
import Page from '../../navigation';
import { authOptions } from '../api/auth/[...nextauth]';

export default function Index() {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !email || !name || !role) {
      toast.info("입력란을 모두 채워주세요.")
      return;
    }

    try {
      await client.post('/api/user', {
        password: createHash('sha256').update(password).digest('hex'),
        email,
        name,
        role,
      });
      toast.success('성공');
      setTimeout(() => router.back(), 1_500);
    } catch (error) {
      console.log(error);
      toast.error('실패');
    }
  };

  return (
    <div className="p-10">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            고객명
          </label>
          <div className="mt-1">
            <input
              required
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
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            이메일
          </label>
          <div className="mt-1">
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            암호
          </label>
          <div className="mt-1">
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              type="password"
              name="password"
              id="password"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <div className="mt-1">
            <input
              list="MEMBER"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              type="text"
              name="role"
              id="role"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return { props: {} };
  }

  return {
    redirect: {
      permanent: false,
      destination: Page.login,
    },
    props: {},
  };
};

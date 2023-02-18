import { createHash } from 'crypto';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession, Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Page from '../../navigation';
import { authOptions } from '../api/auth/[...nextauth]';

export default function Auth(
  session: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:px-10">
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await signIn('credentials', {
                  redirect: false,
                  email: e.currentTarget.email.value,
                  password: createHash('sha256')
                    .update(e.currentTarget.password.value)
                    .digest('hex'),
                  callbackUrl: `${window.location.origin}${Page.readAccounts}`,
                });

                if (response && response.ok && response.url) {
                  await router.push(response.url);
                }
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700"
                >
                  이메일
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="h-12 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-gray-700"
                >
                  암호
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="h-12 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-12 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                로그인
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
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
};

export const getServerSideProps: GetServerSideProps<ServerSideRetrun> = async ({
  req,
  res,
}) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: { ...session } as ServerSideRetrun,
  };
};

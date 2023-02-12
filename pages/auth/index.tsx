import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';

export default function Auth(
  session: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  if (Object.keys(session).length) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn('credentials', {
            // redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
          });
        }}
      >
        <input type="email" autoComplete="username" name="email" />
        <input
          type="password"
          autoComplete="current-password"
          name="password"
        />
        <div>
          <button type="submit">Sign in</button>
        </div>
      </form>
    </>
  );
}

type ServerSideRetrun = {
  user: { address: string; email: string; image: string; name: string };
  expires: string;
};

export const getServerSideProps: GetServerSideProps<ServerSideRetrun> = async ({
  req,
  res,
}) => {
  const result = await getServerSession(req, res, authOptions);
  return {
    props: { ...result } as ServerSideRetrun,
  };
};

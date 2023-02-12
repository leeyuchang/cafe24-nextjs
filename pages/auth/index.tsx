import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession, Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';

export default function Auth(
  session: InferGetServerSidePropsType<typeof getServerSideProps>,
) {

  if (session?.user?.name) {
    return (
      <>
        Signed in as {session.user.name} <br />
        Role as a {session.user.role} <br />
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

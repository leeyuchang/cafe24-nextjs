import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';

export default function Auth(session: any) {
  // const [refresh, setRefresh] = useState(false);
  const { data } = useSession();

  console.log("data ", data?.user.address)

  if (Object.keys(session).length || data) {
    return (
      <>
        Signed in as {session.user?.email} <br />
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
            redirect: false,
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const result = await getServerSession(req, res, authOptions);
  return {
    props: { ...result },
  };
};

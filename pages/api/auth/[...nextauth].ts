import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: '로그인',
      credentials: {},
      // @ts-ignore
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          throw new Error('Missing username or password');
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.password !== password) {
          throw new Error('Invalid username or password');
        }

        return user;
      },
      type: 'credentials',
    }),
    // ...add more providers here
  ],
  callbacks: {
    // 세션 정보를 수정 할 수 있다.
    // session({ session, user }: { session: Session; user: User }) {
    // session({ session }: { session: Session }) {
    async session({ session }: { session: Session }) {
      const { user } = session;
      if (user?.email) {
        const found = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (found?.role) {
          session.user.id = found.id;
          session.user.role = found.role;
        }
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);

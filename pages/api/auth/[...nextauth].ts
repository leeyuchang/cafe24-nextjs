import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // id: new Date().toISOString(),
      name: '이거뭐지',
      credentials: {
        // email: { label: 'Email', type: 'text', placeholder: 'leeyucha@gmail.com' },
        // password: { label: 'Password', type: 'password' },
      },
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

        if (!user) {
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
    session({ session }: { session: Session }) {
      session.user.address = '성남시 수정구 태평';
      return session;
    },
  },
};
export default NextAuth(authOptions);

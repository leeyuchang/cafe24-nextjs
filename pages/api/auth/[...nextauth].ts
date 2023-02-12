import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
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

        if (!user) {
          throw new Error('Invalid username or password');
        }

        return user;
      },
      name: '이거뭐지',
      type: 'credentials',
    }),
    // ...add more providers here
  ],
  callbacks: {
    // 세션 정보를 수정 할 수 있다.
    session({ session }: { session: Session }) {
      // session.user.username = session.user.name
      //   .split(' ')
      //   .join('-')
      //   .toLocaleLowerCase();
      session.user.address = '경기도 성남시 수정구 태평3동';
      return session;
    },
  },
};
export default NextAuth(authOptions);

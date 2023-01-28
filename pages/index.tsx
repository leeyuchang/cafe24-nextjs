import { GetServerSideProps } from 'next';
import { cookieStringToObject } from '../util';
import ScrollableLayout from './ScrollableLayout';

// type Props = ReturnType<typeof getServerSideProps>;

export default function Home(props: Props) {
  return <ScrollableLayout />;
}

// export const getServerSideProps: GetServerSideProps<{
//   data: string;
// }> = async (context) => {
//   const data = 'Hello wolrd 2';

//   const parsedCookie = cookieStringToObject(context.req.headers.cookie);
//   console.log('parsedCookie ===> ', parsedCookie);

//   return {
//     props: { data },
//   };
// };

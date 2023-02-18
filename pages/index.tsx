import Page from '../navigation';

export default function Home(props: any) {
  return <></>;
}

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: Page.login,
    },
    props: {},
  };
};

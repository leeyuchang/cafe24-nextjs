import { GetServerSideProps } from "next";

const Login = () => {
  return (
    <div>
      hello
      <br />
      <>Login</>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("===> context.req", context.req.headers.session);
  return { props: {} };
};

export default Login;

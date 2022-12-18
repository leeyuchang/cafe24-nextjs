import { GetServerSideProps } from "next";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <form action="/api/auth/login" method="post" className="flex flex-col border">
        <label htmlFor="username">
          Username : 
          <input id="username" type="text" name="username" />
        </label>
        <br />
        <label htmlFor="password">
          Password : 
          <input id="password" type="text" name="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   console.log("===> context.req", context.req.headers.session);
//   return { props: {} };
// };

export default Login;

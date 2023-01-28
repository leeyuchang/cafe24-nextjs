import { FormEvent, useEffect, useState } from 'react';
import { useUserLogin } from '../../hooks';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login, isSuccess, data } = useUserLogin();

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('access-token', data.accessToken);
      localStorage.setItem('refresh-token', data.refreshToken);
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ username, password });
  };

  // const handleClick = (e: ChangeEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   void (async () => await client.post('/api/user/refresh', { username }))();
  // };
  return (
    <div className="p-4">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          className="border block"
          value={username}
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <input
          className="border block"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button className="border block" type="submit">
          Submit
        </button>
      </form>

      {/* <div className="mt-10">
        <button className="border p-2" type="button" onClick={handleClick}>
          401 TEST
        </button>
      </div> */}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   console.log("===> context.req", context.req.headers.session);
//   return { props: {} };
// };

export default Login;

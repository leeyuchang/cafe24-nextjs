import { useMutation } from '@tanstack/react-query';
import client from '../pages/api/client';

type LoginData = {
  username: string;
  password: string;
};

const postUserData = async (data: LoginData) => {
  const res = await client.post<{
    accessToken: string;
    refreshToken: string;
  }>('/api/auth/login', data);

  return {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
};

const useUserLogin = () => useMutation((data: LoginData) => postUserData(data));

export default useUserLogin;

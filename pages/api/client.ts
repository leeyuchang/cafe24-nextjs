import axios, { HeadersDefaults } from 'axios';

const client = axios.create();

client.defaults.baseURL = 'http://localhost:3000';

type headers = {
  [key: string]: string;
  'Content-Type': string;
  Accept: string;
  Authorization: string;
};

client.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
} as HeadersDefaults & headers;

// Adding Authorization header for all request
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);


client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (response.status === 401) {
      if (response.data.message === 'ERR_JWS_INVALID') {
        // const originalRequest = config;
        // const refreshToken = localStorage.getItem('refresh-token');
        // const { data } = await client.post('/refresh_token', { refreshToken });

        // const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        //   data;

        // localStorage.setItem('access-token', newAccessToken);
        // localStorage.setItem('refresh-token', newRefreshToken);

        // client.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // return client(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export default client;

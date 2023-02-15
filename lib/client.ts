import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXTAUTH_URL
    : 'https://leeyuchang.cafe24.com';

const client = axios.create({ baseURL, withCredentials: true });

export default client;

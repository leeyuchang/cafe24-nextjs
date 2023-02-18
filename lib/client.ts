import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://leeyuchang.cafe24.com';

const client = axios.create({ baseURL, withCredentials: true });

export default client;

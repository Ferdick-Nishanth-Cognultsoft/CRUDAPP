import axios from 'axios';

const baseURL = 'https://localhost:44311/api/';

export const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})


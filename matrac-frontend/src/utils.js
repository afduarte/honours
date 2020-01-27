import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // api base_url
  timeout: 60000, // request timeout
});

export const ls = {
  getItem: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (_) {
      return null;
    }
  },
  getItemOrElse: (key, defaultVal) => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) {
        throw new Error();
      }
      return JSON.parse(stored);
    } catch (_) {
      return defaultVal;
    }
  },
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  removeItem: key => localStorage.removeItem(key),
};

// request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from local storage
    const token = ls.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // eslint-disable-line no-param-reassign
    }

    return config;
  },
  (error) => {
    // Do something with request error
    console.log('REQUEST ERROR:', error); // for debug
    Promise.reject(error);
  },
);

export const timer = (time, ...args) => new Promise((resolve) => {
  setTimeout(inner => resolve(inner), time, args);
});

export default { api, ls };

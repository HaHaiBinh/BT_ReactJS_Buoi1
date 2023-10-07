import axios from 'axios';
import queryString from 'query-string';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const getFireBaseToken = async () => {
  // check currentUser: nếu có user thì get token ra
  const currentUser = firebase.auth().currentUser;
  if (currentUser) return currentUser.getIdToken();
  // Logged but currentUser is not fetched -> onAuthStateChanged để cho ra token
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null);
    }, 10000);

    // promise run đến khi onAuthStateChanged run có resolve or reject mới stop
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          reject(null);
        }

        const token = await user.getIdToken();
        console.log('token of axios ', token);
        resolve(token);

        unregisterAuthObserver();
        clearTimeout(waitTimer);
      });
  });
};

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // lấy token từ firebase -> gắn vào header của authorization

  const token = await getFireBaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;


/* eslint-disable no-unused-vars */
import axios from 'axios';
import history from '../history';

const determineUrl = (endpoint) => {
  const coreServerUrl = process.env.REACT_APP_MAIN_API_URL;
  let url = endpoint;
  if (url.split('/')[0] !== '') url = `${endpoint}`;
  return coreServerUrl + url;
};

const errorHandler = (msg) => {
  throw new Error(msg);
};

const request = (verb, endpoint, data, requireAuth = false, multipart = false) => {
  const config = {
    url: determineUrl(endpoint),
    method: verb
  };
  if (data) {
    config.data = data;
  }
  if (requireAuth) {
    const contentType = multipart ? 'application/x-www-form-urlencoded' : 'application/json';
    config.headers = {
      'Content-Type': contentType
    };
    // try {
    //   const token = localStorage.getItem('login_token');
    //   if (token) {
    //     config.headers['X-Auth-Token'] = token;
    //   } else {
    //     return errorHandler('User not authenticated');
    //   }
    // } catch (error) {
    //   return errorHandler(error);
    // }
  }

  return axios(config)
    .then((res) => {
      // const { headers } = res;
      // const token = headers && headers['x-auth-token'];

      // if (token) {
      //   localStorage.setItem('login_token', token);
      // }

      return res && res.data;
    })
    .catch((error) => {
      if (error && error.response) {
        const {
          response: {
            data: { message }
          }
        } = error;
        // FIX ME 
        if (message === 'User is not authenticated.' || message === 'Authentication failure.') {
          localStorage.removeItem('state');
          localStorage.removeItem('login_token');
          localStorage.clear();
          history.push('/');
        }
        return error.response.data;
      }
      return error;
    });
};

export default request;
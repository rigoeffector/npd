/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export  const loginApi = {
    auth: {
        login: (data) => request('POST', `user/login`, data, false)
    }
};
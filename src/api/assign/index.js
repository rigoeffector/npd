/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export  const assignApi = {
    assign: {
        create: (data) => request('POST', `assign/create.php`, data, false),
        readAll: (data) => request('GET', `assign/readAll.php`, data, false),
        update: (data) => request('PUT', `assign/readAll.php`, data, false),
        delete: (data) => request('DELETE', `assign/delete.php`, data, false),
    }
};
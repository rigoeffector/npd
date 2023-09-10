/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export  const reportsApi = {
    reports: {
        create: (data) => request('POST', `reports/create.php`, data, false),
        readAll: (data) => request('GET', `reports/readAll.php`, data, false),
        update: (data) => request('PUT', `reports/update.php`, data, false),
        delete: (data) => request('DELETE', `reports/delete.php`, data, false),

    }
};
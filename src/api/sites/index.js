/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export  const sitesApi = {
    sites: {
        create: (data) => request('POST', `sites/create.php`, data, false),
        readAll: (data) => request('GET', `sites/readAll.php`, data, false),
        update: (data) => request('PUT', `sites/update.php`, data, false),
        delete: (data) => request('DELETE', `sites/delete.php`, data, false),
    }
};
/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export  const projectApi = {
    project: {
        create: (data) => request('POST', `projects/create.php`, data, false),
        readAll: (data) => request('GET', `projects/readAll.php`, data, false),
        update: (data) => request('PUT', `projects/update.php`, data, false),
        delete: (data) => request('DELETE', `projects/delete.php`, data, false),
    }
};
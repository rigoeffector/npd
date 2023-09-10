/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export  const attendanceApi = {
    attendance: {
        create: (data) => request('POST', `attendance/create.php`, data, false),
        readAll: (data) => request('GET', `attendance/readAll.php`, data, false),
        update: (data) => request('PUT', `attendance/update.php`, data, false),
        delete: (data) => request('DELETE', `attendance/delete.php`, data, false),

    }
};
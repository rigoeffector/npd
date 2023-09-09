/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export  const employeesApi = {
    employees: {
        create: (data) => request('POST', `employees/create.php`, data, false),
        readAll: (data) => request('GET', `employees/readAll.php`, data, false),
        update: (data) => request('PUT', `employees/update.php`, data, false),
        delete: (data) => request('DELETE', `employees/delete.php`, data, false),
        readByRole: (data) => request('GET', `employees/readByRole.php?role=${data.role}`, data, false),
    }
};
import { combineReducers } from "redux";

import loginUserReducer from "./auth";
import createAssignEmployeeReducer from "./assign/create";
import getAssignListEmployeeReducer from "./assign/read";
import deleteAssignEmployeeReducer from "./assign/delete";
import updateAssignEmployeeReducer from "./assign/update";
import getListEmployeesReducer from "./employees/read";
import getListEmployeesByroleReducer from "./employees/readByRole";
import createSiteReducer from "./sites/create";
import getSitesReducer from "./sites/read";
import updateSiteReducer from "./sites/update";
import deleteSiteReducer from "./sites/delete";
import createEmployeeReducer from "./employees/create";
import deleteEmployeeReducer from "./employees/delete";
import createProjectReducer from "./project/create";
import listProjectsReducer from "./project/read";
import updateProjectReducer from "./project/update";
import deleteProjectReducer from "./project/delete";
import getListEmployeesByOthersReducer from "./employees/readByOther";
import createAttendanceReducer from "./attendance/create";
import getAttendanceReducer from "./attendance/read";
import updateAttendanceReducer from "./attendance/update";
import filterAttendanceReducer from "./attendance/filter";
import createReportReducer from "./reports/create";
import deleteReportReducer from "./reports/delete";
import updateReportReducer from "./reports/update";
import listReportReducer from "./reports/read";

const rootReducer = combineReducers({
  auth: loginUserReducer,
  createAssignEmployee: createAssignEmployeeReducer,
  listAssignEmployees: getAssignListEmployeeReducer,
  deleteAssignEmployee: deleteAssignEmployeeReducer,
  updateAssignEmployee: updateAssignEmployeeReducer,
  listEmployees: getListEmployeesReducer,
  listEmployeeByRole: getListEmployeesByroleReducer,
  createSite: createSiteReducer,
  listSites: getSitesReducer,
  updateSite: updateSiteReducer,
  deleteSite: deleteSiteReducer,
  createEmployee: createEmployeeReducer,
  deleteEmployee: deleteEmployeeReducer,
  createProject:createProjectReducer,
  listProjects:listProjectsReducer,
  updateProject:updateProjectReducer,
  deleteProject:deleteProjectReducer,
  listEmployeesByOthers:getListEmployeesByOthersReducer,
  createAttendance: createAttendanceReducer,
  listAttendances: getAttendanceReducer,
  updateAttendance:updateAttendanceReducer,
  filterAttendance: filterAttendanceReducer,
  createReport: createReportReducer,
  deleteReport: deleteReportReducer,
  updateReport: updateReportReducer,
  readReports:listReportReducer
});

export default rootReducer;

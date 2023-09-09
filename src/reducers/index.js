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
});

export default rootReducer;

import { all, fork } from "redux-saga/effects";
import { watchLoginData } from "./auth";
import { watchListAssignEmployeesData } from "./assign/read";
import { watchDeleteAssignEmployeeData } from "./assign/delete";
import { watchListEmployeesData } from "./employees/read";
import { watchCreateSiteData } from "./sites/create";
import { watchListSiteData } from "./sites/read";
import { watchDeleteSiteData } from "./sites/delete";
import { watchUpdateSiteData } from "./sites/update";
import { watchCreateEmployeeData } from "./employees/create";
import { watchDeleteEmployeeData } from "./employees/delete";
import { watchCreateProjectData } from "./project/create";
import { watchListProjectsData } from "./project/read";
import { watchUpdateProjectData } from "./project/update";
import { watchDeleteProjectData } from "./project/delete";
import { watchListEmployeesByRoleData } from "./employees/readByRole";

export default function* rootSaga() {
  yield all([
    fork(watchLoginData),
    fork(watchListAssignEmployeesData),
    fork(watchDeleteAssignEmployeeData),
    fork(watchListEmployeesData),
    fork(watchCreateSiteData),
    fork(watchListSiteData),
    fork(watchDeleteSiteData),
    fork(watchUpdateSiteData),
    fork(watchCreateEmployeeData),
    fork(watchDeleteEmployeeData),
    fork(watchCreateProjectData),
    fork(watchListProjectsData),
    fork(watchUpdateProjectData),
    fork(watchDeleteProjectData),
    fork(watchListEmployeesByRoleData)
  ]);
}

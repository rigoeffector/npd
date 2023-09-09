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
    fork(watchDeleteEmployeeData)
  ]);
}

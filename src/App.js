/* eslint-disable no-unused-vars */
import "./App.css";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// import Router from "./routes";
import { Routes, Route, Navigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import DashboardLayout from "./layouts/dashboard";
import Associates from "./pages/Associates";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AssignedProject from "./pages/AssignedProject";
import AssociateDetails from "./pages/AssociateDetails";
import NewAssociate from "./components/Associate/newAssociate";
import Page404 from "./pages/Page404";
import SignUp from "./pages/SignUp";
import MyTasks from "./pages/Tasks";
import PrivateRoute from "./pages/PrivateRoute";
import Admin from "./pages/Admin";
import ImportAssociates from "./components/Associate/Admin/ImportAssociates";
import AssingNewEmployee from "./pages/AssignNew";
import Attendance from "./pages/Attendance";
import { useSelector } from "react-redux";
function App() {
  const { auth } = useSelector((state) => state);
  return (
    <>
      <ThemeConfig>
        <GlobalStyles />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute passedRole="super">
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            {auth && auth.data.role === "super" && (
              <Route
                path="/"
                element={
                  <PrivateRoute passedRole="super">
                    <Navigate to="/dashboard/home" />
                  </PrivateRoute>
                }
              ></Route>
            )}

            <Route
              path="dashboard/associates"
              element={
                <PrivateRoute passedRole={auth && auth.data.role}>
                  <Associates />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="dashboard/associates/new/employee"
              element={
                <PrivateRoute passedRole={auth && auth.data.role}>
                  <NewAssociate />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="dashboard/home"
              element={
                <PrivateRoute passedRole={auth && auth.data.role}>
                  <Home />
                </PrivateRoute>
              }
            ></Route>
            <Route
              exactpath="/"
              element={
                <PrivateRoute passedRole="super">
                  <Home />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="dashboard/*"
              element={
                // <PrivateRoute role="Standard">
                <Page404 />
                // </PrivateRoute>
              }
            ></Route>
            {/* {(auth && auth.data.role === "super") ||
              (auth && auth.data.role === "projectmanager" && ( */}
                <Route
                  path="/dashboard/projects"
                  element={
                    <PrivateRoute passedRole={auth && auth.data.role}>
                      <MyTasks />
                    </PrivateRoute>
                  }
                ></Route>
              {/* ))} */}
            {/* {(auth && auth.data.role === "super") ||
              (auth && auth.data.role === "projectmanager" && ( */}
                <Route
                  path="/dashboard/assigned/projects"
                  element={
                    <PrivateRoute passedRole={auth && auth.data.role}>
                      <AssignedProject />
                    </PrivateRoute>
                  }
                ></Route>
              {/* ))} */}
            {/* {(auth && auth.data.role === "super") ||
              (auth && auth.data.role === "sitemanager") ||
              (auth && auth.data.role === "capita") ||
              (auth && auth.data.role === "projectmanager" && ( */}
                <Route
                  path="/dashboard/assigned/projects/attendance"
                  element={
                    <PrivateRoute passedRole={auth && auth.data.role}>
                      <Attendance />
                    </PrivateRoute>
                  }
                ></Route>
              {/* ))} */}

            {/* {(auth && auth.data.role === "super") ||
              (auth && auth.data.role === "sitemanager") ||
              (auth && auth.data.role === "capita") ||
              (auth && auth.data.role === "projectmanager" && ( */}
                <Route
                  path="dashboard/associates/newassociate"
                  element={
                    <PrivateRoute passedRole={auth && auth.data.role}>
                      <NewAssociate />
                    </PrivateRoute>
                  }
                ></Route>
              {/* ))} */}
            <Route
              path="dashboard/new/assign"
              element={
                <PrivateRoute passedRole="super">
                  <AssingNewEmployee />
                </PrivateRoute>
              }
            />
            {/* {(auth && auth.data.role === "sitemanager") ||
              (auth && auth.data.role === "capita" && ( */}
                <Route
                  path="dashboard/settings/sites"
                  element={
                    <PrivateRoute passedRole={auth && auth.data.role}>
                      <Admin />
                    </PrivateRoute>
                  }
                ></Route>
              {/* ))} */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ThemeConfig>
    </>
  );
}

export default App;

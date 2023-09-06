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
function App() {
  return (
    <>
      <ThemeConfig>
        <GlobalStyles />
        <Routes>
          <Route
            path="/"
            element={
              // <PrivateRoute role="Standard">
              <DashboardLayout />
              // </PrivateRoute>
            }
          >
            <Route
              path="/"
              element={
                // <PrivateRoute role="Standard">
                <Navigate to="/dashboard/home" />
                // </PrivateRoute>
              }
            ></Route>
            <Route
              path="dashboard/associates"
              element={
                // <PrivateRoute role="Standard">
                <Associates />
                // </PrivateRoute>
              }
            ></Route>
            <Route
              path="dashboard/associates/:id"
              element={
                // <PrivateRoute role="Standard">
                <AssociateDetails />
                // </PrivateRoute>
              }
            ></Route>
            <Route
              path="dashboard/associates/new/employee"
              element={
                // <PrivateRoute role="Standard">
                <NewAssociate />
                // </PrivateRoute>
              }
            ></Route>
            <Route
              path="dashboard/home"
              element={
                // <PrivateRoute role="Standard">
                <Home />
                // </PrivateRoute>
              }
            ></Route>
            <Route
              exactpath="/"
              element={
                // <PrivateRoute role="Standard">
                <Home />
                // </PrivateRoute>
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
            <Route
              path="dashboard/register"
              element={
                // <PrivateRoute role="Admin">
                <SignUp />
                // </PrivateRoute>
              }
            ></Route>
            <Route
              path="/dashboard/projects"
              element={
                // <PrivateRoute role="Standard">
                <MyTasks />
                // </PrivateRoute>
              }
            ></Route>
            <Route
              path="/dashboard/assigned/projects"
              element={
                // <PrivateRoute role="Standard">
                <AssignedProject />
                // </PrivateRoute>
              }
            ></Route>
            <Route
              path="/dashboard/assigned/projects/attendance"
              element={
                // <PrivateRoute role="Standard">
                <Attendance />

                // </PrivateRoute>
              }
            ></Route>
            <Route
              path="dashboard/associates/newassociate"
              element={
                // <PrivateRoute role="Standard">
                <NewAssociate />
                // </PrivateRoute>
              }
            ></Route>
            <Route
              path="dashboard/new/assign"
              element={
                // <PrivateRoute role="Stabdard">
                <AssingNewEmployee />
                // </PrivateRoute>
              }
            />
            <Route
              path="dashboard/settings/sites"
              element={
                // <PrivateRoute role="Admin">
                <Admin />
                // </PrivateRoute>
              }
            ></Route>
            <Route
              path="admin/import"
              element={
                // <PrivateRoute role="Admin">
                <ImportAssociates />
                // </PrivateRoute>
              }
            ></Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ThemeConfig>
    </>
  );
}

export default App;

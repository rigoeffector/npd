/* eslint-disable no-unused-vars */
import { useAuth } from "../utils/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Page403 from "./Page403";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, passedRole }) => {
 const {
    auth: { data, loading, message, success, error },
  } = useSelector((state) => state);

  
  let location = useLocation();

  if (data?.role === undefined) {
    return <Navigate to="/login" state={{ from: location }} />;

  } else if (data?.role === null) {
    console.log("ting to", location);
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    if (data?.role === "super") {
      if (!data?.role) {
        return <Page403 />;
      }
    }
    return children;
  }
  // return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
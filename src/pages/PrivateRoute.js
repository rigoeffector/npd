/* eslint-disable no-unused-vars */
import { useAuth } from "../utils/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Page403 from "./Page403";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, passedRole }) => {
  const {
    auth,
  } = useSelector((state) => state);

  let location = useLocation();

  if (Object.keys(auth).length === 0) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    if (auth && auth.data && auth && auth.data?.role === undefined) {
      return <Navigate to="/login" state={{ from: location }} />;
    } else if (auth && auth.data && auth && auth.data?.role === null) {
      console.log("ting to", location);
      return <Navigate to="/login" state={{ from: location }} />;
    } else {
      if (auth && auth.data && auth && auth.data?.role === "super") {
        if (!auth && auth.data && !auth && auth.data?.role) {
          return <Page403 />;
        }
      }
      return children;
    }
  }
};

export default PrivateRoute;

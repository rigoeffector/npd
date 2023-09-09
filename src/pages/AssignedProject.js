/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Box,
  CircularProgress,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/context/AuthContext";
import ThanksCard from "../components/Thanks/ThanksCard";
import Page from "../components/Page";
import NPDModal from "../components/modal";
import { useDispatch, useSelector } from "react-redux";
import { GET_ASSIGN_EMPLOYEES_LIST_REQUEST } from "../reducers/assign/constants";

const Thanks = () => {
  const [showModal, setShowModal] = useState(false);
  const [filterID, setFilterID] = useState();
  const [pagination, setPagination] = useState(3);
  const [searchField, setSearchField] = useState("");
  const [distance, setDistance] = useState(6);
  const [anchorEl, setAnchorEl] = useState(false);
  const dispatch = useDispatch();

  const {
    listAssignEmployees: {
      data: listAssignEmployeesData,
      success,
      loading: listAssignEmployeesLoading,
    },
  } = useSelector((state) => state);

  useEffect(() => {
    // Dispatch the action to fetch data when the component mounts
    dispatch({
      type: GET_ASSIGN_EMPLOYEES_LIST_REQUEST,
    });
  }, [dispatch]);

  return (
    <>
      <Page title="">
        <Box
          sx={{
            px: 1,
            py: 0.5,
            mb: 2,
            borderRadius: "10px",
            boxShadow: 7,
            background: "white",
            borderBottom: "solid black 3px",
          }}
        >
          <Grid
            container
            direction="row"
            sx={{ p: 1 }}
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                columnSpacing={2}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography
                  sx={{
                    marginLeft: "20px",
                    fontWeight: "800",
                  }}
                >
                  All Assigned Projects
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                component={Link}
                to={"/dashboard/new/assign"}
              >
                Assign Employee To a Project
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
           {listAssignEmployeesLoading ? (
          <CircularProgress />
        ) : (
          <>
            {/* Check if listAssignEmployeesData is not null or undefined */}
            {listAssignEmployeesData && listAssignEmployeesData.length > 0 ? (
              listAssignEmployeesData.map((item) => (
                <ThanksCard key={item.assignmentId} data={item} />
              ))
            ) : (
              <p>No assigned projects found.</p>
            )}
          </>
        )}
        </Grid>
      </Page>
    </>
  );
};

export default Thanks;
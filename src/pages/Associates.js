/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import UserListHead from "../components/Associates/UserListHead";
import UserListToolbar from "../components/Associates/UserListToolbar";
import Label from "../components/Label";
import { Link } from "react-router-dom";
import Scrollbar from "../components/Scrollbar";
import * as moment from "moment";
import Page from "../components/Page";
import { DataTable } from "../components/table";
// import { CSVLink, CSVDownload } from "react-csv";
import { sentenceCase } from "change-case";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  associatesContext,
  resultsPerPageContext,
} from "../utils/context/contexts";
import { useDispatch, useSelector } from "react-redux";
import { GET_EMPLOYEES_LIST_REQUEST } from "../reducers/employees/constants";

const Associates = () => {
  const dispatch = useDispatch();

  const {
    listEmployees: {
      data: listEmployeesData,
      success,
      loading: listEmployeesLoading,
    },
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch({
      type: GET_EMPLOYEES_LIST_REQUEST,
    });
  }, [dispatch]);

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "fname", headerName: "First name", width: 130 },
    { field: "lname", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      width: 90,
    },

    {
      field: "idnumber",
      headerName: "ID Number",
      width: 130,
    },
    {
      field: "role",
      headerName: "Role",
      width: 130,
    },
    {
      field: "salary",
      headerName: "Salary",
      width: 130,
    },
    {
      field: "",
      headerName: "Action",
      type: "actions",
      width: 300,
      getActions: (params) => [
        <div className="actions_button">
          <Button
            style={{
              borderRadius: "8px",
              border: "1px solid  #DCDFE5",
              background: "#F9FAFB",
              color: "#1090CB",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "normal",
            }}
            // onClick={() => handleAssignAsset(params)}
          >
            Edit
          </Button>
        </div>,
        <div className="actions_button">
          <Button
            style={{
              borderRadius: "8px",
              border: "1px solid  #DCDFE5",
              background: "#F9FAFB",
              color: "red",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "normal",
            }}
            // onClick={() => handleAssignAsset(params)}
          >
            Delete
          </Button>
        </div>,
      ],
    },
  ];

  return (
    <Page title="HR Core - Associates">
      <Box>
        <Container maxWidth="xl" sx={{ pb: 5 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h4" gutterBottom>
              All Employees
            </Typography>

            <Button
              variant="contained"
              component={Link}
              to={"/dashboard/associates/new/employee"}
            >
              New Employee
            </Button>
          </Stack>
          {/* {associatesData && ( */}
          <Card
            sx={{
              padding: "2rem",
            }}
          >
            {listEmployeesLoading ? (
              <CircularProgress />
            ) : (
              <DataTable
                rows={listEmployeesData || []}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            )}
          </Card>
          {/* )} */}
        </Container>
      </Box>
    </Page>
  );
};

export default Associates;

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
  Alert,
} from "@mui/material";
import {
  associatesContext,
  resultsPerPageContext,
} from "../utils/context/contexts";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_EMPLOYEE_REQUEST,
  GET_EMPLOYEES_LIST_REQUEST,
} from "../reducers/employees/constants";
import AlertConfirmDialog from "../components/modal/confitm";

const Associates = () => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const {
    listEmployees: {
      data: listEmployeesData,
      success,
      loading: listEmployeesLoading,
    },
    deleteEmployee,
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
            View more
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
            onClick={() => handleDelete(params)}
          >
            Delete
          </Button>
        </div>,
      ],
    },
  ];
  const handleDelete = (data) => {
    debugger;
    setShowDelete(true);
    setDeleteId(data?.row?.id);
  };

  const handleClose = () => {
    setShowDelete(false);
  };

  const handleConfirm = () => {
    const payload = {
      id: deleteId,
    };
    dispatch({
      type: DELETE_EMPLOYEE_REQUEST,
      payload,
    });
  };

  useEffect(() => {
    if (deleteEmployee?.success) {
      handleClose();
    }
  }, [deleteEmployee?.success]);
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
          <AlertConfirmDialog
            show={showDelete}
            title={"Delete employee"}
            handleClose={handleClose}
            action={
              <Box>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleConfirm} autoFocus variant="contained">
                  {deleteEmployee && deleteEmployee?.loading ? (
                    <CircularProgress />
                  ) : (
                    "  Yes, Delete"
                  )}
                </Button>
              </Box>
            }
          >
            <Typography>Are you sure you want to delete this info</Typography>
            <Box sx={{ marginTop: "20px", width: "100%" }}>
              {deleteEmployee &&
                !deleteEmployee?.success &&
                deleteEmployee.message && (
                  <Alert variant="filled" severity="error">
                    {deleteEmployee?.message}
                  </Alert>
                )}
            </Box>
          </AlertConfirmDialog>

          <Card
            sx={{
              padding: "2rem",
            }}
          >
            {deleteEmployee &&
              deleteEmployee?.success &&
              deleteEmployee?.message && (
                <Alert variant="filled" severity="success">
                  {deleteEmployee?.message}
                </Alert>
              )}
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

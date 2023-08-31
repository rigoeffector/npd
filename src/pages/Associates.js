/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
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
} from "@mui/material";
import {
  associatesContext,
  resultsPerPageContext,
} from "../utils/context/contexts";

const Associates = () => {
  const { associates: associatesData, setAssociates: setAssociatesData } =
    useContext(associatesContext);
  const [filterName, setFilterName] = useState("");

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("LastName");

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      width: 90,
    },
    {
      field: "title",
      headerName: "Title",
      width: 130,
    },
    {
      field: "department",
      headerName: "Department",
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

  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      title: "Project Manager",
      department: "Management",
      startDate: "2022/09/12",
      employeeStatus: "Active",
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      title: "Techinician Manager",
      department: "IT",
      startDate: "2022/09/12",
      employeeStatus: "Active",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      title: "Site Manager",
      department: "Developer",
      startDate: "2022/09/12",
      employeeStatus: "Active",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      age: 16,
      title: "Capita",
      department: "Developer",
      startDate: "2022/09/12",
      employeeStatus: "Active",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: null,
      title: "Project Manager",
      department: "Management",
      startDate: "2022/09/12",
      employeeStatus: "Active",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      age: 150,
      title: "Project Manager",
      department: "Management",
      startDate: "2022/09/12",
      employeeStatus: "Active",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      age: 44,
      title: "Employee",
      department: "Management",
      startDate: "2022/09/12",
      employeeStatus: "Active",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      age: 36,
      title: "Project Manager",
      department: "Management",
      startDate: "2022/09/12",
      employeeStatus: "Active",
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      age: 65,
      title: "Project Manager",
      department: "Management",
      startDate: "2022/09/12",
      employeeStatus: "Active",
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

            <Button variant="contained" component={Link} to={"/dashboard/associates/new/employee"}>
              New Employee
            </Button>
          </Stack>
          {/* {associatesData && ( */}
          <Card
            sx={{
              padding: "2rem",
            }}
          >
            <DataTable
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Card>
          {/* )} */}
        </Container>
      </Box>
    </Page>
  );
};

export default Associates;

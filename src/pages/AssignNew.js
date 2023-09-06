/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Card, Stack, Grid, Box, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import DataTableCheckable from "../components/table/checkabletable";

const AssingNewEmployee = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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
      field: "salary",
      headerName: "salary",
      width: 130,
    },
    {
      field: "site",
      headerName: "Site",
      width: 130,
    },
  ];

  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      title: "Project Manager",
      salary: "450,000",
      site: "Nyarutarama Site",
      employeeStatus: "Active",
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      title: "Techinician Manager",
      salary: "120,000",
      site: "Ruhango Site",
      employeeStatus: "Active",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      title: "Site Manager",
      salary: "12,900",
      site: "Nyarutarama Site",
      employeeStatus: "Active",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      age: 16,
      title: "Capita",
      salary: "13,000",
      site: "Muhira Site",
      employeeStatus: "Active",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: null,
      title: "Project Manager",
      salary: "450,000",
      site: "Nyarutarama Site",
      employeeStatus: "Active",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      age: 150,
      title: "Project Manager",
      salary: "40,000",
      site: "Nyarutarama Site",
      employeeStatus: "Active",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      age: 44,
      title: "Employee",
      salary: "4,000",
      site: "Nyarutarama Site",
      employeeStatus: "Active",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      age: 36,
      title: "Project Manager",
      salary: "50,000",
      site: "Nyarutarama Site",
      employeeStatus: "Active",
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      age: 65,
      title: "Project Manager",
      salary: "45,000",
      site: "Nyarutarama Site",
      employeeStatus: "Active",
    },
  ];
  return (
    <Page title="HR Core - Holidays">
      <Card
        sx={{
          padding: "20px",
        }}
      >
        <Stack>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "800",
            }}
          >
            Select Employee to be assigned{" "}
          </Typography>
        </Stack>
        <Box
          sx={{
            margin: "20px 0px",
          }}
        >
          <DataTableCheckable
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
        </Box>
      </Card>
    </Page>
  );
};

export default AssingNewEmployee;

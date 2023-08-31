import React, { useState } from "react";

import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Card, Stack, Grid, Box, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import DataTable from "../components/table";
import DataTableCheckable from "../components/table/checkabletable";

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const projectList = [
    { label: "Amadeus", value: 1984 },
    { label: "To Kill a Mockingbird", value: 1962 },
    { label: "Toy Story 3", value: 2010 },
    { label: "Logan", value: 2017 },
    { label: "Full Metal Jacket", value: 1987 },
    { label: "Dangal", value: 2016 },
  ];
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={4}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={projectList}
                  renderInput={(params) => (
                    <TextField {...params} label="Select a Project" />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={projectList}
                  renderInput={(params) => (
                    <TextField {...params} label="Select a Project Site" />
                  )}
                />
              </Grid>

              <Grid item sx={4} sm={4} xl={4}>
                <TextField
                  label="Date and Time"
                  type="datetime-local"
                  // value={selectedDate.toISOString().slice(0, 16)}
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5.29V7h2v7.71l3.25 3.25-1.42 1.42L12 14.12z" />
                        </svg>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Box sx={{
          margin:'20px 0px'
        }}>
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

export default Attendance;

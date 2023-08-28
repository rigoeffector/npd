import React from "react";

import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Card, Stack, Grid, Box } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Field } from "formik";

const Attendance = () => {
  const projectList = [
    { label: "Amadeus", value: 1984 },
    { label: "To Kill a Mockingbird", value: 1962 },
    { label: "Toy Story 3", value: 2010 },
    { label: "Logan", value: 2017 },
    { label: "Full Metal Jacket", value: 1987 },
    { label: "Dangal", value: 2016 },
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
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Field
                    component={DatePicker}
                    label="Date"
                    size="small"
                    name="DOB"
                    // value={values.DOB}
                    inputFormat="dd-MM-yyyy"
                    onChange={(DOB) => {
                      // setFieldValue("DOB", new Date(DOB));
                      // setFieldValue("DOB", Timestamp.fromDate(new Date(DOB)));
                    }}
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider> */}
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Card>
    </Page>
  );
};

export default Attendance;

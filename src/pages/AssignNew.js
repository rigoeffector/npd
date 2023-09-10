/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Card,
  Stack,
  Grid,
  Box,
  Typography,
  Button,
  Skeleton,
  CircularProgress,
  Alert,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import DataTableCheckable from "../components/table/checkabletable";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_EMPLOYEES_LIST_BYOTHERS_REQUEST,
  GET_EMPLOYEES_LIST_REQUEST,
} from "../reducers/employees/constants";
import { GET_PROJECTS_LIST_REQUEST } from "../reducers/project/constants";
import { CREATE_ASSIGN_EMPLOYEE_REQUEST } from "../reducers/assign/constants";

const AssingNewEmployee = () => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [moreInfo, setMoreInfo] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const {
    listEmployeesByOthers: {
      data: listEmployeesData,
      success,
      loading: listEmployeesLoading,
    },
    createAssignEmployee,
    listProjects,
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch({
      type: GET_EMPLOYEES_LIST_BYOTHERS_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch({
      type: GET_PROJECTS_LIST_REQUEST,
    });
  }, [dispatch]);
  const [selectionModel, setSelectionModel] = useState([]);

  // Function to handle selection changes
  const handleSelectionChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  // Function to get selected row data

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "emfname", headerName: "First name", width: 130 },
    { field: "emlname", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      width: 90,
    },
    {
      field: "role",
      headerName: "Title",
      width: 130,
    },
    {
      field: "salary",
      headerName: "Salary(RWF)",
      width: 130,
    },
    {
      field: "site_name",
      headerName: "Site",
      width: 130,
    },

    {
      field: "doclink",
      headerName: "ID Document",

      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          href={params?.row.doclink}
          target="_blank"
        >
          View
        </Button>
      ),
    },
  ];
  // Handle the change event when an option is selected
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValue(newValue);
  };

  const handleAssign = () => {
    // You can use the selectionModel to filter the rows and get the selected data
    const selectedData = listEmployeesData.filter((row) =>
      selectionModel.includes(row.id)
    );

    const newArray = selectedData.map((employee) => ({
      projectId: selectedValue.value, // Use the selected project value
      employeeId: employee.id, // Use the employee's id
      // Add other properties as needed
    }));
    dispatch({
      type: CREATE_ASSIGN_EMPLOYEE_REQUEST,
      payload: newArray,
    });
  };
  const actions = [{ name: "Assign to a Project", click: handleAssign }];

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
            Select Project and Employee(s) then assign{" "}
          </Typography>
        </Stack>

        <Grid container xs={12} spacing={2}>
          <Grid item xs={4} sx={{ marginTop: "20px" }}>
            {createAssignEmployee && createAssignEmployee?.loading && (
              <CircularProgress />
            )}
            {listProjects && listProjects?.loading ? (
              <Skeleton />
            ) : (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={
                  listProjects &&
                  listProjects.data &&
                  listProjects?.data.length > 0
                    ? listProjects?.data
                        .filter((pr) => pr.status === "running")
                        .map((pr) => ({
                          label: pr.name,
                          value: pr.id,
                        }))
                    : [{ label: "Select", value: "No Projects available" }]
                }
                onChange={handleAutocompleteChange} // Handle selection change
                value={selectedValue} // Set the selected value
                renderInput={(params) => (
                  <TextField {...params} label="Select a Project" />
                )}
              />
            )}
          </Grid>
          <Box
            sx={{
              margin: "20px",
            }}
          >
            {createAssignEmployee &&
              !createAssignEmployee?.success &&
              createAssignEmployee.message && (
                <Alert variant="filled" severity="error">
                  {createAssignEmployee?.message}
                </Alert>
              )}
            {createAssignEmployee &&
              createAssignEmployee?.success &&
              createAssignEmployee.message && (
                <Alert variant="filled" severity="success">
                  {createAssignEmployee?.message}
                </Alert>
              )}
          </Box>
        </Grid>
        <Box
          sx={{
            margin: "20px 0px",
          }}
        >
          <DataTableCheckable
            rows={listEmployeesData || []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            actions={actions}
            selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionChange}
          />
        </Box>
      </Card>
    </Page>
  );
};

export default AssingNewEmployee;

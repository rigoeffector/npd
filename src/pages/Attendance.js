import React, { useState } from "react";

import Page from "../components/Page";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Card,
  Stack,
  Grid,
  Box,
  Button,
  Typography,
  Skeleton,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import DataTableCheckable from "../components/table/checkabletable";
import { useDispatch, useSelector } from "react-redux";
import { GET_EMPLOYEES_LIST_BYOTHERS_REQUEST } from "../reducers/employees/constants";
import { GET_PROJECTS_LIST_REQUEST } from "../reducers/project/constants";
import {
  CREATE_ATTENDANCE_REQUEST,
  GET_ATTENDANCES_LIST_REQUEST,
  UPDATE_ATTENDANCE_REQUEST,
} from "../reducers/attendance/constants";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { capitalize } from "lodash";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();
  const [selectedValueProject, setSelectedValueProject] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectionUpdateModel, setSelectionUpdateModel] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    listEmployeesByOthers: { data: listEmployeesData },
    createAttendance,
    updateAttendance,
    listAttendances,
    listProjects,
  } = useSelector((state) => state);
  React.useEffect(() => {
    dispatch({
      type: GET_PROJECTS_LIST_REQUEST,
    });
  }, [dispatch]);
  React.useEffect(() => {
    dispatch({
      type: GET_EMPLOYEES_LIST_BYOTHERS_REQUEST,
    });
  }, [dispatch]);

  React.useEffect(() => {
    dispatch({
      type: GET_ATTENDANCES_LIST_REQUEST,
    });
  }, [dispatch]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  React.useEffect(() => {
    if (createAttendance.success || updateAttendance?.success) {
      setSelectionUpdateModel([]);
      setSelectionModel([]);
    }
  }, [createAttendance.success, updateAttendance?.success]);

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
    setSelectedValueProject(newValue);
  };
  // Function to handle selection changes
  const handleSelectionChange = (newSelection) => {
    setSelectionModel(newSelection);
  };
  const handleSelectionUpdateChange = (newSelection) => {
    setSelectionUpdateModel(newSelection);
  };
  const handlePresent = () => {
    // You can use the selectionModel to filter the rows and get the selected data
    const selectedData = listEmployeesData.filter((row) =>
      selectionModel.includes(row.id)
    );

    const newArray = selectedData.map((employee) => ({
      projectId: selectedValueProject.value, // Use the selected project value
      employeeId: employee.id,
      status: "present", // Use the employee's id
      // Add other properties as needed
    }));
    dispatch({
      type: CREATE_ATTENDANCE_REQUEST,
      payload: newArray,
    });
  };
  const handleSick = () => {
    // You can use the selectionModel to filter the rows and get the selected data
    const selectedData = listEmployeesData.filter((row) =>
      selectionModel.includes(row.id)
    );

    const newArray = selectedData.map((employee) => ({
      projectId: selectedValueProject.value, // Use the selected project value
      employeeId: employee.id,
      status: "sick", // Use the employee's id
      // Add other properties as needed
    }));
    dispatch({
      type: CREATE_ATTENDANCE_REQUEST,
      payload: newArray,
    });
  };
  const handleAbsent = () => {
    // You can use the selectionModel to filter the rows and get the selected data
    const selectedData = listEmployeesData.filter((row) =>
      selectionModel.includes(row.id)
    );

    const newArray = selectedData.map((employee) => ({
      projectId: selectedValueProject.value, // Use the selected project value
      employeeId: employee.id,
      status: "absent", // Use the employee's id
      // Add other properties as needed
    }));
    dispatch({
      type: CREATE_ATTENDANCE_REQUEST,
      payload: newArray,
    });
  };
  const actions = [
    { name: "Mark as sick", click: handleSick },
    { name: "Mark as present", click: handlePresent },
    { name: "Mark as absent", click: handleAbsent },
  ];

  const handleUpdateSick = () => {
    debugger;
    // You can use the selectionModel to filter the rows and get the selected data
    const selectedData = listAttendances?.data.filter((row) =>
      selectionUpdateModel.includes(row.id)
    );

    const newArray = selectedData.map((employee) => ({
      id: employee.id,
      status: "absent", // Use the employee's id
      // Add other properties as needed
    }));
    dispatch({
      type: UPDATE_ATTENDANCE_REQUEST,
      payload: newArray,
    });
  };

  const handleUpdatePresent = () => {
    // You can use the selectionModel to filter the rows and get the selected data
    const selectedData = listAttendances?.data.filter((row) =>
      selectionUpdateModel.includes(row.id)
    );

    const newArray = selectedData.map((employee) => ({
      id: employee.id,

      status: "present", // Use the employee's id
      // Add other properties as needed
    }));
    dispatch({
      type: UPDATE_ATTENDANCE_REQUEST,
      payload: newArray,
    });
  };
  const handleUpdateAbsent = () => {
    // You can use the selectionModel to filter the rows and get the selected data
    const selectedData = listAttendances?.data.filter((row) =>
      selectionUpdateModel.includes(row.id)
    );

    const newArrayData = selectedData.map((employee) => ({
      id: employee.id,
      status: "absent", // Use the employee's id
      // Add other properties as needed
    }));
    dispatch({
      type: UPDATE_ATTENDANCE_REQUEST,
      payload: newArrayData,
    });
  };
  const actionsUpdate = [
    { name: "Mark as sick", click: handleUpdateSick },
    { name: "Mark as present", click: handleUpdatePresent },
    { name: "Mark as absent", click: handleUpdateAbsent },
  ];
  const columnsAttendances = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "employeeFirstName", headerName: "First name", width: 130 },
    { field: "employeeLastName", headerName: "Last name", width: 130 },
    {
      field: "employeeAge",
      headerName: "Age",
      width: 90,
    },
    {
      field: "employeeRole",
      headerName: "Role",
      width: 130,
    },
    {
      field: "employeeSalary",
      headerName: "Salary(RWF)",
      width: 130,
    },
    {
      field: "employeeDob",
      headerName: "DOB",
      width: 130,
    },
    {
      field: "employeeGender",
      headerName: "Gender",
      width: 130,
    },

    {
      field: "employeeIdNumber",
      headerName: "ID Number",
      width: 130,
    },

    {
      field: "employeePhoneNumber",
      headerName: "Phone Number",
      width: 130,
    },
    {
      field: "emergencyFirstName",
      headerName: "Emergency Names",
      width: 130,
      renderCell: (params) => (
        <Typography>
          {params.row.emergencyFirstName} {params.row.emergencyLastName}
        </Typography>
      ),
    },
    {
      field: "emergencyPhoneNumber",
      headerName: "Emergency EmergePhone Number",
      width: 130,
    },
    {
      field: "emergencyRelation",
      headerName: "EmergePhone Relation",
      width: 130,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      width: 130,
    },
    {
      field: "siteName",
      headerName: "Site Name",
      width: 130,
    },
    {
      field: "siteLocation",
      headerName: "Site Name",
      width: 130,
    },
    {
      field: "attendanceStatus",
      headerName: "Attendance Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={capitalize(params.row?.attendanceStatus)}
          color={
            params.row?.attendanceStatus === "present"
              ? "success"
              : params.row?.attendanceStatus === "sick"
              ? "warning"
              : "error"
          }
        />
      ),
    },
    {
      field: "attendanceTime",
      headerName: "Attended On",
      width: 130,
    },
    {
      field: "doclink",
      headerName: "ID Document",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          href={params?.row.documentLink}
          target="_blank"
        >
          View
        </Button>
      ),
    },
    // {
    //   field: "",
    //   headerName: "Mark As",
    //   type: "actions",
    //   width: 300,
    //   getActions: (params) => [
    //     <div className="actions_button">
    //       <Button
    //         style={{
    //           borderRadius: "8px",
    //           border: "1px solid  #DCDFE5",
    //           background: "#F9FAFB",
    //           color: "red",
    //           fontSize: "14px",
    //           fontWeight: "600",
    //           lineHeight: "normal",
    //         }}
    //         disabled={params.row.attendanceStatus === 'absent' ? true: false}
    //         onClick={() => handleUpdateStatus(params, "absent")}
    //       >
    //         Absent
    //       </Button>
    //     </div>,
    //     <div className="actions_button">
    //       <Button
    //         style={{
    //           borderRadius: "8px",
    //           border: "1px solid  #DCDFE5",
    //           background: "#F9FAFB",
    //           color: "#1090CB",

    //           fontSize: "14px",
    //           fontWeight: "600",
    //           lineHeight: "normal",
    //         }}
    //         disabled={params.row.attendanceStatus === 'present' ? true: false}

    //         onClick={() => handleUpdateStatus(params, "present")}
    //       >
    //         Present
    //       </Button>
    //     </div>,
    //     <div className="actions_button">
    //       <Button
    //         style={{
    //           borderRadius: "8px",
    //           border: "1px solid  green",
    //           background: "#F9FAFB",
    //           color: "green",

    //           fontSize: "14px",
    //           fontWeight: "600",
    //           lineHeight: "normal",
    //         }}
    //         disabled={params.row.attendanceStatus === 'sick' ? true: false}

    //         onClick={() => handleUpdateStatus(params, "sick")}
    //       >
    //         Sick
    //       </Button>
    //     </div>,
    //   ],
    // },
  ];
  return (
    <Page title="Attendance">
      <Card
        sx={{
          padding: "20px",
        }}
      >
        <Typography sx={{ margin: "20px 0px", fontWeight: "700" }}>
          Mark Attendance
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Mark Employee" {...a11yProps(0)} />
              <Tab label="Attendance Reports" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box
              sx={{
                margin: "20px",
              }}
            >
              {createAttendance && createAttendance?.loading && (
                <CircularProgress />
              )}
              {createAttendance &&
                !createAttendance?.success &&
                createAttendance.message && (
                  <Alert variant="filled" severity="error">
                    {createAttendance?.message}
                  </Alert>
                )}
              {createAttendance &&
                createAttendance?.success &&
                createAttendance.message && (
                  <Alert variant="filled" severity="success">
                    {createAttendance?.message}
                  </Alert>
                )}
            </Box>
            <Stack>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container xs={12} spacing={2}>
                  <Grid item sx={6} sm={6} xl={6}>
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
                            : [
                                {
                                  label: "Select",
                                  value: "No Projects available",
                                },
                              ]
                        }
                        onChange={handleAutocompleteChange} // Handle selection change
                        value={selectedValueProject} // Set the selected value
                        renderInput={(params) => (
                          <TextField {...params} label="Select a Project" />
                        )}
                      />
                    )}
                  </Grid>

                  <Grid item sx={6} sm={6} xl={6}>
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
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Box
              sx={{
                margin: "20px",
              }}
            >
              {updateAttendance &&
                !updateAttendance?.success &&
                updateAttendance.message && (
                  <Alert variant="filled" severity="error">
                    {updateAttendance?.message}
                  </Alert>
                )}
              {updateAttendance &&
                updateAttendance?.success &&
                updateAttendance.message && (
                  <Alert variant="filled" severity="success">
                    {updateAttendance?.message}
                  </Alert>
                )}
            </Box>
            {(listAttendances && listAttendances?.loading) ||
            updateAttendance?.loading ? (
              <CircularProgress />
            ) : listAttendances &&
              listAttendances?.data &&
              listAttendances?.data.length > 0 ? (
              <DataTableCheckable
                rows={listAttendances?.data || []}
                columns={columnsAttendances}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                enableReport={true}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                actions={actionsUpdate}
                selectionModel={selectionUpdateModel}
                onSelectionModelChange={handleSelectionUpdateChange}
              />
            ) : (
              <Typography>No Attendance Found Yet</Typography>
            )}
          </CustomTabPanel>
        </Box>
      </Card>
    </Page>
  );
};

export default Attendance;

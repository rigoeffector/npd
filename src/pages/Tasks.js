/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Page from "../components/Page";
import AddTask from "../components/Tasks/AddTask";
import { styled, alpha } from "@mui/material/styles";
import { useEffect, useState, useContext } from "react";
import PaidIcon from "@mui/icons-material/Paid";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { TextField, Select, FormControl, InputLabel } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Button,
  Grid,
  Box,
  Typography,
  Stack,
  Menu,
  MenuItem,
  Backdrop,
  Modal,
  Fade,
  Card,
} from "@mui/material";
import { tasksToApproveContext } from "../utils/context/contexts";
import { useAuth } from "../utils/context/AuthContext";
// import { getDoc, doc } from "firebase/firestore";
// import { db } from "../utils/firebase";
import TaskCard from "../components/Tasks/TaskCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DataTable from "../components/table";
import NPDModal from "../components/modal";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const MyTasks = () => {
  // const { userData } = useAuth();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [PopupOpen, setPopupOpen] = useState(false);
  const [taskType, setTaskType] = useState();
  // const { associates } = useContext(associatesContext);
  const [userDetails, setUserDetails] = useState();
  const [myManager, setMyManager] = useState();
  // const { tasks, tasksToApprove } = useContext(tasksToApproveContext);

  useEffect(() => {
    // if (!userData) return;
    // else {
    //   const AssociatesCollectionRef = doc(db, "Associates", userData.id);
    //   getDoc(AssociatesCollectionRef).then((result) => {
    //     setUserDetails(result.data());
    //     const ManagerCollectionRef = doc(
    //       db,
    //       "Associates",
    //       result.data().Manager
    //     );
    //     getDoc(ManagerCollectionRef).then((results) =>
    //       setMyManager(results.data())
    //     );
    //   });
    // }
  }, []);

  const filterObject = (obj, filter, filterValue) =>
    Object.keys(obj).reduce(
      (acc, val) =>
        obj[val][filter] === filterValue
          ? {
              ...acc,
              [val]: obj[val],
            }
          : acc,
      {}
    );
  // const pendingTasks = filterObject(tasks, "status", "pending");
  // const approvedTasks = filterObject(tasks, "status", "approved");
  // const rejectedTasks = filterObject(tasks, "status", "rejected");

  // const completeTasks = { ...approvedTasks, ...rejectedTasks };
  const [showModalAddNew, setShowModalAddNew] = React.useState(false);
  const handleClickAction = (event) => {
    setShowModalAddNew(true);
  };
  const handleClose = () => {
    setShowModalAddNew(false);
  };
  const handleCloseAction = () => {
    setAnchorEl(null);
    setTaskType(null);
    setPopupOpen(false);
  };
  const handleClickOpen = (type) => {
    setTaskType(type);
    setPopupOpen(true);
    console.log(PopupOpen);
    // handleCloseAction();
    setAnchorEl(null);
    setOpen(true);
  };

  // const onSubmit = (data) => uploadFile(data);

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  const style = {
    position: "absolute",
    top: { xs: "50%", md: "30%" },
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { md: "35vw", xs: "95vw" },
    height: { md: "40vh", xs: "100vh" },
    // bgcolor: "background.paper",
    // border: "2px solid #000",
    // boxShadow: 20,
    p: 4,
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Project Name", width: 130 },
    { field: "manager", headerName: "Project Manager", width: 160 },
    {
      field: "site",
      headerName: "Project Site",
      width: 190,
    },
    {
      field: "timeline",
      headerName: "Time Line",
      width: 230,
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
        <div className="actions_button">
          <Button
            style={{
              borderRadius: "8px",
              border: "1px solid  #DCDFE5",
              background: "#F9FAFB",
              color: "green",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "normal",
            }}
            // onClick={() => handleAssignAsset(params)}
          >
            More
          </Button>
        </div>,
      ],
    },
  ];

  const rows = [
    {
      id: 1,
      name: "Snow",
      manager: "Jon",
      site: "Kabeza",
      timeline: "2023/11/03 -  2025/11/03",
    },
    {
      id: 2,
      name: "Lannister",
      manager: "Cersei",
      site: "Kabeza",
      timeline: "2023/11/03 -  2025/11/03",
    },
    {
      id: 3,
      name: "Lannister",
      manager: "Jaime",
      site: "Kabeza",
      timeline: "2023/11/03 -  2025/11/03",
    },
    {
      id: 4,
      name: "Stark",
      manager: "Arya",
      site: "Kabeza",
      timeline: "2023/11/03 -  2025/11/03",
    },
    {
      id: 5,
      name: "Targaryen",
      manager: "Daenerys",
      site: "Kabeza",
      timeline: "2023/11/03 -  2025/11/03",
    },
    {
      id: 6,
      name: "Melisandre",
      manager: null,
      site: "Kabeza",
      timeline: "2023/11/03 -  2025/11/03",
    },
    {
      id: 7,
      name: "Clifford",
      manager: "Ferrara",
    },
    {
      id: 8,
      name: "Frances",
      manager: "Rossini",
      site: "Kabeza",
      timeline: "2023/11/03 -  2025/11/03",
    },
    {
      id: 9,
      name: "Roxie",
      manager: "Harvey",
      site: "Kabeza",
      timeline: "2023/11/03 -  2025/11/03",
    },
  ];
  return (
    <Page title="HR Core - Tasks">
      <NPDModal
        title={"Add New Project"}
        show={showModalAddNew}
        handleClose={handleClose}
      >
        <Formik
          // validationSchema={stepOneValidationSchema}
          // onSubmit={handleSubmit}
          initialValues={{
            Email: "",
            Password: "",
          }}
        >
          {({ values, validateOnMount, resetForm }) => (
            <Form>
              <Grid container>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        label="Name"
                        type="text"
                        name="name"
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>Manager</InputLabel>
                        <Field
                          as={Select}
                          name="manager"
                          required
                          size="small"
                          label="Manager"
                          fullWidth
                        >
                          <MenuItem value={"1"}>Annet</MenuItem>
                          <MenuItem value={"1"}>Sandrine</MenuItem>
                          <MenuItem value={"1"}>Jule</MenuItem>
                        </Field>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Site</InputLabel>
                        <Field
                          as={Select}
                          name="site"
                          required
                          size="small"
                          label="Site"
                          fullWidth
                        >
                          <MenuItem value={"1"}>Kabeza</MenuItem>
                          <MenuItem value={"1"}>Konombe</MenuItem>
                          <MenuItem value={"1"}>Nyarutarama</MenuItem>
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item sx={6} sm={6} xl={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Field
                          component={DatePicker}
                          label="Start Date"
                          size="small"
                          name="startDate"
                          value={values.StartDate}
                          inputFormat="dd-MM-yyyy"
                          onChange={(StartDate) => {
                            // setFieldValue(
                            //   "StartDate",
                            //   new Date(StartDate)
                            //   // Timestamp.fromDate(new Date(StartDate))
                            // );
                          }}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              {...params}
                              sx={{
                                "min-width": "100% !important",
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item sx={6} sm={6} xl={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Field
                          fullWidth
                          component={DatePicker}
                          label="End Date"
                          size="small"
                          name="endDate"
                          value={values.StartDate}
                          inputFormat="dd-MM-yyyy"
                          onChange={(StartDate) => {
                            // setFieldValue(
                            //   "StartDate",
                            //   new Date(StartDate)
                            //   // Timestamp.fromDate(new Date(StartDate))
                            // );
                          }}
                          renderInput={(params) => (
                            <TextField size="small" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        label="Description"
                        type="text"
                        name="description"
                        fullWidth
                        size="small"
                        multiline
                        rows={4}
                        placeholder="Enter Description Value"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      sx={{ width: "100%", mb: 2 }}
                      type="submit"
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Grid>
                </Box>
              </Grid>
            </Form>
          )}
        </Formik>
      </NPDModal>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        sx={{ px: 2 }}
      >
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Projects
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickAction}
            endIcon={<AddCircleIcon color="white" fontSize="large" />}
          >
            Add New Project
          </Button>
        </Grid>

        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={openMenu}
          onClose={() => {
            setAnchorEl(null);
          }}
        >
          <MenuItem
            onClick={() => {
              handleClickOpen("Salary Increase");
            }}
            disableRipple
          >
            <PaidIcon sx={{ color: "#ff0000" }} />
            Salary Increase
          </MenuItem>
          <MenuItem
            onClick={() => handleClickOpen("Title Change")}
            disableRipple
          >
            <ManageAccountsIcon color={"#ff0000"} />
            Title Change
          </MenuItem>
        </StyledMenu>
      </Grid>

      <Grid container direction="row" sx={{ p: 2 }} spacing={2} rowSpacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Box
                sx={{
                  background: "white",
                  px: 1,
                  py: 0.5,
                  borderRadius: "10px",
                  boxShadow: 7,
                  borderBottom: "solid black 3px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="black">
                    My Projects
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "black",
                      borderRadius: "5px",
                      px: 1,
                      py: 0.5,
                      color: "white",
                      minWidth: "25px",
                    }}
                  >
                    {/* {Object.keys(pendingTasks).length} */}120
                  </Box>
                </Stack>
              </Box>
            </Grid>
            {/* {pendingTasks &&
              Object.keys(pendingTasks).map((task, index) => {
                return (
                  <Grid item xs={12} md={4} lg={4} key={index}>
                    <TaskCard
                      task={pendingTasks[task]}
                      userID={userData.id}
                      taskPath={task}
                    />
                  </Grid>
                );
              })} */}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Box
                sx={{
                  backgroundColor: "white",
                  px: 1,
                  py: 0.5,
                  borderRadius: "10px",
                  boxShadow: 7,
                  borderBottom: "solid #ff8c00 3px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="black">
                    To approve
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "black",
                      borderRadius: "5px",
                      px: 1,
                      py: 0.5,
                      color: "white",
                      minWidth: "25px",
                    }}
                  >
                    {/* {Object.keys(tasksToApprove).length} */}
                    13
                  </Box>
                </Stack>
              </Box>
            </Grid>

            {/* {tasksToApprove &&
              Object.keys(tasksToApprove).map((task, index) => {
                return (
                  <Grid item xs={12} md={4} lg={4} key={index}>
                    <TaskCard
                      task={tasksToApprove[task]}
                      userID={userData.id}
                    />
                  </Grid>
                );
              })} */}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Box
                sx={{
                  backgroundColor: "white",
                  px: 1,
                  py: 0.5,
                  borderRadius: "10px",
                  boxShadow: 7,
                  borderBottom: "solid  #18b809 3px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="black">
                    Complete
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "black",
                      borderRadius: "5px",
                      px: 1,
                      py: 0.5,
                      color: "white",
                      minWidth: "25px",
                    }}
                  >
                    {/* {Object.keys(completeTasks).length} */}
                    17
                  </Box>
                </Stack>
              </Box>
            </Grid>
            {/* {completeTasks &&
              Object.keys(completeTasks).map((task, index) => {
                return (
                  <Grid item xs={12} md={4} lg={4} key={index}>
                    <TaskCard task={completeTasks[task]} userID={userData.id} />
                  </Grid>
                );
              })} */}
          </Grid>
        </Grid>
      </Grid>
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
    </Page>
  );
};
export default MyTasks;

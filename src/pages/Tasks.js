/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Page from "../components/Page";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  CircularProgress,
  Alert,
  Skeleton,
  Chip,
} from "@mui/material";
import {
  Button,
  Grid,
  Box,
  Typography,
  Stack,
  MenuItem,
  Card,
} from "@mui/material";
import * as Yup from "yup";

import { useFormik } from "formik";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DataTable from "../components/table";
import NPDModal from "../components/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_PROJECT_REQUEST,
  DELETE_PROJECT_REQUEST,
  GET_PROJECTS_LIST_REQUEST,
} from "../reducers/project/constants";
import AlertConfirmDialog from "../components/modal/confitm";
import { GET_EMPLOYEES_LIST_BYROLE_REQUEST } from "../reducers/employees/constants";
import { GET_SITES_LIST_REQUEST } from "../reducers/sites/constants";
import moment from "moment";
import { capitalize } from "lodash";

const MyTasks = () => {
  // const { userData } = useAuth();
  const [open, setOpen] = useState(false);
  const [showModalAddNew, setShowModalAddNew] = React.useState(false);
  const [showModalEditNew, setShowModalEditNew] = React.useState(false);
  const [moreInfo, setMoreInfo] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const {
    auth,
    listProjects: { data, success, loading },
    deleteProject,
    listSites,
    listEmployeeByRole,
    createProject,
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch({
      type: GET_PROJECTS_LIST_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch({
      type: GET_SITES_LIST_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch({
      type: GET_EMPLOYEES_LIST_BYROLE_REQUEST,
      payload: {
        role: "projectmanager",
      },
    });
  }, [dispatch]);

  useEffect(() => {
    if (createProject.success) handleClose();
  }, [createProject.success]);

  const handleClickAction = (event) => {
    setShowModalAddNew(true);
  };
  const handleClose = () => {
    setShowModalAddNew(false);
    setShowMore(false);
    setShowModalEditNew(false);
    setShowDelete(false);
  };

  const handleViewMore = (data) => {
    const { row } = data;
    setMoreInfo(row);
    setShowMore(true);
  };
  const handleDelete = (data) => {
    setShowDelete(true);
    setDeleteId(data?.row?.id);
  };

  const handleConfirm = () => {
    const payload = {
      id: deleteId,
    };
    dispatch({
      type: DELETE_PROJECT_REQUEST,
      payload,
    });
  };

  useEffect(() => {
    if (deleteProject?.success) {
      handleClose();
    }
  }, [deleteProject?.success]);
  const columns = [
    { field: "name", headerName: "Project Name", width: 300 },
    { field: "startdate", headerName: "Start Date", width: 160 },
    { field: "enddate", headerName: "End Date", width: 160 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={capitalize(params.row?.status)}
          color={
            params.row?.status === "completed"
              ? "success"
              : params.row?.status === "running"
              ? "warning"
              : "error"
          }
        />
      ),
    },

    {
      field: "",
      headerName: "Action",
      type: "actions",
      width: 300,
      // hide:
      //   !(auth && auth.data && auth.data.role === "super") ||
      //   !(auth && auth.data && auth.data.role === "projectmanager"),
      getActions: (params) => [
        // <div className="actions_button">
        //   <Button
        //     style={{
        //       borderRadius: "8px",
        //       border: "1px solid  #DCDFE5",
        //       background: "#F9FAFB",
        //       color: "#1090CB",
        //       fontSize: "14px",
        //       fontWeight: "600",
        //       lineHeight: "normal",
        //     }}
        //     onClick={() => handleEdit(params)}
        //   >
        //     Edit
        //   </Button>
        // </div>,
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
            onClick={() => handleViewMore(params)}
          >
            More
          </Button>
        </div>,
      ],
    },
  ];
  const StyledDateTextField = styled(TextField)({
    width: "100%",
    height: "50px", // Set the width to 100%
    '& input[type="date"]': {
      padding: "10px",
      height: "30px", // You can adjust the padding as needed
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").nullable(),
    managerId: Yup.string().required("Manager is required").nullable(),
    siteId: Yup.string().required("Site is required").nullable(),
    startdate: Yup.date().required("Start Date is required").nullable(),
    enddate: Yup.date().required("End Date is required").nullable(),
    description: Yup.string().required("Description is required").nullable(),
  });
  const formik = useFormik({
    initialValues: {
      name: isEdit ? moreInfo.name : "",
      managerId: isEdit ? moreInfo?.manager.id : "",
      siteId: isEdit ? moreInfo.site.id : "",
      startdate: isEdit ? moreInfo.startdate : "",
      enddate: isEdit ? moreInfo.enddate : "",
      description: isEdit ? moreInfo.description : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        name: values.name,
        managerId: values.managerId,
        siteId: values.siteId,
        startdate: moment(values.startdate).format("YYYY/MM/DD"),
        enddate: moment(values.enddate).format("YYYY/MM/DD"),
        description: values.description,
        status: "running",
      };

      dispatch({ type: CREATE_PROJECT_REQUEST, payload });
      resetForm();
    },
  });
  return (
    <Page title="HR Core - Tasks">
      <NPDModal
        title={"Add New Project"}
        show={showModalAddNew}
        handleClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
                <Grid item sx={6} sm={6} xl={6}>
                  <TextField
                    fullWidth
                    name="name"
                    InputLabelProps={{
                      shrink: true,
                      // Add red color to the label
                    }}
                    label={
                      <div>
                        Project Name{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </div>
                    }
                    value={formik.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  {listEmployeeByRole && listEmployeeByRole.loading ? (
                    <Skeleton />
                  ) : (
                    <FormControl fullWidth>
                      <TextField
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        InputLabelProps={{
                          shrink: true,
                          // Add red color to the label
                        }}
                        label={
                          <div>
                            Project Manager{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </div>
                        }
                        name="managerId"
                        select
                        value={formik.values.managerId}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.managerId &&
                          Boolean(formik.errors.managerId)
                        }
                        helperText={
                          formik.touched.managerId && formik.errors.managerId
                        }
                      >
                        {listEmployeeByRole &&
                        listEmployeeByRole.data?.length > 0 ? (
                          listEmployeeByRole &&
                          listEmployeeByRole.data.map((manager, i) => (
                            <MenuItem key={i} value={manager.id}>
                              {manager.fname} {manager.lname}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="Select Manager">Select</MenuItem>
                        )}
                      </TextField>
                    </FormControl>
                  )}
                </Grid>

                <Grid item xs={12}>
                  {listSites && listSites?.loading ? (
                    <Skeleton />
                  ) : (
                    <FormControl fullWidth>
                      <TextField
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        InputLabelProps={{
                          shrink: true,
                          // Add red color to the label
                        }}
                        label={
                          <div>
                            Site Name{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </div>
                        }
                        name="siteId"
                        select
                        value={formik.values.siteId}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.siteId && Boolean(formik.errors.siteId)
                        }
                        helperText={
                          formik.touched.siteId && formik.errors.siteId
                        }
                      >
                        {listSites &&
                        listSites.data &&
                        listSites.data.length > 0 ? (
                          listSites &&
                          listSites.data.map((site, i) => (
                            <MenuItem key={i} value={site.id}>
                              {site.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value={"select"}>Select Site</MenuItem>
                        )}
                      </TextField>
                    </FormControl>
                  )}
                </Grid>
                <Grid item sx={6} sm={6} xl={6}>
                  <StyledDateTextField
                    InputLabelProps={{
                      shrink: true,
                      // Add red color to the label
                    }}
                    label={
                      <div>
                        Start Date{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </div>
                    }
                    name="startdate"
                    type="date"
                    value={formik.values.startdate}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.startdate &&
                      Boolean(formik.errors.startdate)
                    }
                    helperText={
                      formik.touched.startdate && formik.errors.startdate
                    }
                  />
                </Grid>
                <Grid item sx={6} sm={6} xl={6}>
                  <StyledDateTextField
                    InputLabelProps={{
                      shrink: true,
                      // Add red color to the label
                    }}
                    label={
                      <div>
                        expanded Date{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </div>
                    }
                    name="enddate"
                    type="date"
                    value={formik.values.enddate}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.enddate && Boolean(formik.errors.enddate)
                    }
                    helperText={formik.touched.enddate && formik.errors.enddate}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: "15px" }}>
                  <TextField
                    fullWidth
                    name="description"
                    InputLabelProps={{
                      shrink: true,
                      // Add red color to the label
                    }}
                    label={
                      <div>
                        Description{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </div>
                    }
                    value={formik.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    // size="small"
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
                  {createProject && createProject.loading ? (
                    <CircularProgress />
                  ) : (
                    "Save"
                  )}
                </Button>
              </Grid>
            </Box>
            {createProject &&
              !createProject?.success &&
              createProject.message && (
                <Alert variant="filled" severity="error">
                  {createProject?.message}
                </Alert>
              )}
          </Grid>
        </form>
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
          {/* {auth && auth.data && auth.data.role === "super" ||
            auth && auth.data && auth.data.role === "projectmanager"  ( */}
          <Button
            variant="contained"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickAction}
            endIcon={<AddCircleIcon color="white" fontSize="large" />}
          >
            Add New Project
          </Button>
          {/* )} */}
        </Grid>
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
                    All Projects
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
                    {data && data.length}
                  </Box>
                </Stack>
              </Box>
            </Grid>
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
                    Currently Running
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
                    {data &&
                      data.length &&
                      data &&
                      data.filter((project) => project.status === "running")
                        .length}
                  </Box>
                </Stack>
              </Box>
            </Grid>
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
                    {data &&
                      data.length &&
                      data &&
                      data.filter((project) => project.status === "completed")
                        .length}
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Card
        sx={{
          padding: "2rem",
        }}
      >
        {createProject && createProject?.success && createProject?.message && (
          <Alert variant="filled" severity="success">
            {createProject?.message}
          </Alert>
        )}
        {loading && <CircularProgress />}
        {data && data.length > 0 ? (
          <DataTable
            rows={data || []}
            columns={columns}
            reportName={"NPD Cotraco"}
            subTitle={"All NPD Projects List"}
            fileName={"all-projects"}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        ) : (
          "No Projects Found"
        )}
      </Card>

      <NPDModal
        show={showMore}
        handleClose={handleClose}
        title={"More Information"}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "5px 0px",
              }}
            >
              <Typography>Project Name</Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  color: "#494577",
                }}
              >
                {moreInfo?.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "5px 0px",
              }}
            >
              <Typography>Start Date</Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  color: "#494577",
                }}
              >
                {moreInfo?.startdate}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "5px 0px",
              }}
            >
              <Typography>End Date</Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  color: "#494577",
                }}
              >
                {moreInfo.enddate}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "5px 0px",
              }}
            >
              <Typography>Description</Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  color: "#494577",
                }}
              >
                {moreInfo?.description}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "5px 0px",
              }}
            >
              <Typography>Manager</Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  color: "#494577",
                }}
              >
                {moreInfo?.manager?.fname} {moreInfo?.manager?.lname}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "5px 0px",
              }}
            >
              <Typography>Site</Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  color: "#494577",
                }}
              >
                {moreInfo?.site?.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "5px 0px",
              }}
            >
              <Typography>Status</Typography>

              <Chip
                label={capitalize(moreInfo?.status)}
                color={
                  moreInfo?.status === "completed"
                    ? "success"
                    : moreInfo?.status === "running"
                    ? "warning"
                    : "error"
                }
              />
            </Box>
          </Grid>
        </Grid>
      </NPDModal>
      <AlertConfirmDialog
        show={showDelete}
        title={"Delete Project"}
        handleClose={handleClose}
        action={
          <Box>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleConfirm} autoFocus variant="contained">
              {deleteProject && deleteProject?.loading ? (
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
          {deleteProject &&
            !deleteProject?.success &&
            deleteProject.message && (
              <Alert variant="filled" severity="error">
                {deleteProject?.message}
              </Alert>
            )}
        </Box>
      </AlertConfirmDialog>
    </Page>
  );
};
export default MyTasks;

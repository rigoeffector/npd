/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as moment from "moment";
import Page from "../components/Page";
import { DataTable } from "../components/table";
// import { CSVLink, CSVDownload } from "react-csv";
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  fabClasses,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_EMPLOYEE_REQUEST,
  GET_EMPLOYEES_LIST_REQUEST,
} from "../reducers/employees/constants";
import AlertConfirmDialog from "../components/modal/confitm";
import NPDModal from "../components/modal";

const Associates = () => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [showMore, setShowMore]= useState(false);
  const [moreInfo, setMoreInfo]= useState({});
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
            onClick={() => handleViewMore(params)}
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
    setShowDelete(true);
    setDeleteId(data?.row?.id);
  };

  const handleClose = () => {
    setShowDelete(false);
    setShowMore(false);
    setMoreInfo({});

  };

  const handleViewMore =(data)=>{
    const {row}= data;
    setShowMore(true);
    setMoreInfo(row);
  }

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
        <NPDModal show={showMore} handleClose={handleClose} title={'More Information'}>
        <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Employee Name</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.fname} {moreInfo?.lname}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>ID Number</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.idnumber}
                            </Typography>
                        </Box>
                    </Grid>

                   
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Phone Number</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo.phonenumber}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Age</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.age}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Salary (RWF)</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.salary}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Gender</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.gender}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Role</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.role}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Emergency Names</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.emfname} {moreInfo?.emlname}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Emergency Phone</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.emphone} 
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Emergency Relation</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.emrelation} 
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Site Name</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.site_name} 
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Site Location</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.site_location} 
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',

                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Date of Birth</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moment(moreInfo?.dob).format('YYYY/MM/DD')}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
        </NPDModal>
      </Box>
    </Page>
  );
};

export default Associates;

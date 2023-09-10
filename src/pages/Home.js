/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Grid,
  Fade,
  Typography,
  Card,
  Backdrop,
  Modal,
  Container,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import DepartmentGraph from "../components/Graphs/departmentGraph";
import OfficeGraph from "../components/Graphs/officeGraph";
import TotalEmployed from "../components/Graphs/TotalEmployed";
import StarterTimeline from "../components/Timeline/starterTimeline";
import WelcomeCard from "../components/_dashboard/welcomeCard";
import BirthdayTimeline from "../components/Timeline/birthdayTimeline";
import TotalEmployedHistory from "../components/Graphs/TotalEmployedHistory";
import AverageSalary from "../components/Graphs/AverageSalary";
import Page from "../components/Page";
import CasualWorkers from "../components/Graphs/CausalWorkers";
import DataTable from "../components/table";
import AlertConfirmDialog from "../components/modal/confitm";

import DoughnutChart from "../components/Graphs/officeGraph";
import { useDispatch, useSelector } from "react-redux";
import { GET_PROJECTS_LIST_REQUEST } from "../reducers/project/constants";
import {
  GET_REPORTS_LIST_REQUEST,
  UPDATE_REPORT_REQUEST,
} from "../reducers/reports/constants";

const Home = () => {
  const dispatch = useDispatch();
  const {
    auth,
    listProjects: { data: projects, loading },
    updateReport,
    readReports,
  } = useSelector((state) => state);

  const [moreInfo,setMoreInfo]= useState({})
  const [status,setStatus]= useState('')
  const [showUpdateModal, setShowUpdateModal]= useState(false);
  useEffect(() => {
    dispatch({
      type: GET_PROJECTS_LIST_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch({
      type: GET_REPORTS_LIST_REQUEST,
    });
  }, [dispatch]);

  const [isOpen, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setShowUpdateModal(false);
  };


  useEffect(()=>{
    if(updateReport?.success){
      handleClose();
    }
  },[updateReport?.success])
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "80vw", md: "40vw", lg: "40vw" },
    height: { xs: "80vh", md: "70vh", lg: "70vh" },
    bgcolor: "white",
    textAlign: "center",
    // border: "2px solid #000",
    boxShadow: 2,
    // p: 4,
  };

  const handleAction = (d, st) => {
    debugger;
    const {row}= d;
   setMoreInfo(row);
   setStatus(st);
   setShowUpdateModal(true);
  };
  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "reportName", headerName: "Report name", width: 300 },
    { field: "reportStatus", headerName: "Status", flex: 2 },
    {
      field: "reportDescription",
      headerName: "Description",
      flex: 2,
    },
    {
      field: "reportCreatedAt",
      headerName: "Created At",
      flex: 2,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: 2,
      renderCell: (params) => (
        <Typography>
          {params?.row?.createdBy?.firstName} {params?.row?.createdBy?.lastName}
        </Typography>
      ),
    },
    {
      field: "reportLink",
      headerName: "Document Link",
      flex: 2,
      renderCell: (params) => (
        <Button href={params.row?.reportLink} target="_blank">
          View
        </Button>
      ),
    },

    {
      field: "",
      headerName: "Action",
      type: "actions",
      width: 200,
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
            onClick={() => handleAction(params, "rejected")}
          >
            Reject
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
            onClick={() => handleAction(params, "approved")}
          >
            Approve
          </Button>
        </div>,
      ],
    },
  ];
  const handleConfirm =()=>{
    const payload = {
      id: moreInfo.id,
      updatedBy: auth && auth.data.id,
      status: status,
    };
    dispatch({
      type: UPDATE_REPORT_REQUEST,
      payload
    })
  }
  return (
    <Page title=" Dashboard">
      <AlertConfirmDialog
        show={showUpdateModal}
        title={"Update Status of Doc"}
        handleClose={handleClose}
        action={
          <Box>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleConfirm} autoFocus variant="contained">
              {updateReport && updateReport?.loading ? (
                <CircularProgress />
              ) : (
                "  Yes, Update"
              )}
            </Button>
          </Box>
        }
      >
        <Typography>
          Are you sure you want to change status of this info
        </Typography>
        <Box sx={{ marginTop: "20px", width: "100%" }}>
          {updateReport && !updateReport?.success && updateReport.message && (
            <Alert variant="filled" severity="error">
              {updateReport?.message}
            </Alert>
          )}
        </Box>
      </AlertConfirmDialog>
      <Container maxWidth="xl">
        <Grid container direction="row" spacing={3} sx={{ paddingTop: 1 }}>
          <Grid item xs={12} sm={7} md={7}>
            <WelcomeCard />
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            {projects && !loading && (
              <DoughnutChart
                completed={
                  projects &&
                  projects.length &&
                  projects &&
                  projects.filter((project) => project.status === "completed")
                    .length
                }
                running={
                  projects &&
                  projects.length &&
                  projects &&
                  projects.filter((project) => project.status === "running")
                    .length
                }
              />
            )}
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{
              background: "white",
              margin: "21px 0px",
              borderRadius: "20px",
            }}
          >
            <Typography sx={{ fontWeight: "700", margin: "20px 0px" }}>
              Pending Reports
            </Typography>
            {readReports && readReports.loading && <CircularProgress />}
            {readReports && readReports.data && readReports.data.length > 0 ? (
              <DataTable
                rows={readReports?.data || []}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            ) : (
              <Typography>No Reports Found</Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Home;

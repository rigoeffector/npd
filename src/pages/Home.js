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
import DoughnutChart from "../components/Graphs/officeGraph";
import { useDispatch, useSelector } from "react-redux";
import { GET_PROJECTS_LIST_REQUEST } from "../reducers/project/constants";

const Home = () => {
  const dispatch = useDispatch();
  const {
    listProjects: { data: projects, loading },
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch({
      type: GET_PROJECTS_LIST_REQUEST,
    });
  }, [dispatch]);
  const [isOpen, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

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
  return (
    <Page title="HR Core - Dashboard">
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

          <Grid item xs={12} sm={12} md={12}>
            <Typography>Pending Reports</Typography>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Home;

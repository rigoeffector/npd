/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Box,
  CircularProgress,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
// import {
//   ref,
//   onValue,
//   getDatabase,
//   query,
//   orderByChild,
//   limitToLast,
// } from "firebase/database";
import { Link } from "react-router-dom";

import { useAuth } from "../utils/context/AuthContext";
import ThanksCard from "../components/Thanks/ThanksCard";
import Page from "../components/Page";
import NPDModal from "../components/modal";

const Thanks = () => {
  // const { userData } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [filterID, setFilterID] = useState();
  const [pagination, setPagination] = useState(3);
  const paginationChoices = [3, 10, 20, 30, 40];
  useEffect(() => {
    // const dbrt = getDatabase();
    // // const AllNotifications = query(ref(dbrt, `Notifications/${userData.id}`));
    // const AllThanks = query(
    //   ref(dbrt, "Thanks"),
    //   orderByChild("Timestamp"),
    //   // startAt(monthAgo),
    //   limitToLast(pagination)
    //   // endAt("TeamPlayer")
    // );
    // onValue(AllThanks, (snapshot) => {
    //   if (snapshot.val() != null) {
    //     const data = snapshot.val();
    //     console.log(data, "all thanks");
    //     const tempArray = [];
    //     Object.entries(data).forEach(([key, value]) => {
    //       tempArray.push({ ...value, ThanksID: key });
    //     });
    //     setThanks(
    //       tempArray.sort((a, b) => (a.Timestamp < b.Timestamp ? 1 : -1))
    //     );
    //   } else {
    //   }
    // });
  }, []);

 


  const handleShowAddNew=()=>{
    setShowModal(true);
  }

  const handleClose =()=>{
    
  }
  return (
    <>
      <Page title="">
     
        <Box
          sx={{
            px: 1,
            py: 0.5,
            mb: 2,
            borderRadius: "10px",
            boxShadow: 7,
            background: "white",
            borderBottom: "solid black 3px",
          }}
        >
          <Grid
            container
            direction="row"
            sx={{ p: 1 }}
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                columnSpacing={2}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography
                  sx={{
                    marginLeft: "20px",
                    fontweight: "800",
                  }}
                >
                  All Assigned Projects
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" component={Link} to={"/dashboard/new/assign"}>
                Assign Employee To a Project
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Grid item xs={4}>
            <ThanksCard />
          </Grid>
          <Grid item xs={4}>
            <ThanksCard />
          </Grid>
          <Grid item xs={4}>
            <ThanksCard />
          </Grid>
          <Grid item xs={4}>
            <ThanksCard />
          </Grid>
          <Grid item xs={4}>
            <ThanksCard />
          </Grid>
        </Grid>
      </Page>
    </>
  );
};

export default Thanks;

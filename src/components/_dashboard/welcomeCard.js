/* eslint-disable no-unused-vars */
import { Card, Typography, CardMedia, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../utils/context/AuthContext";
import { useSelector } from "react-redux";

export default function WelcomeCard() {
  const {
    auth: { data, loading, message, success, error },
  } = useSelector((state) => state)
  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    // textAlign: "center",
    padding: theme.spacing(4, 4),
    color: theme.palette.secondary.darker,
    backgroundColor: theme.palette.secondary.lighter,
    height: '367px'
  }));
  return (
    <RootStyle>
      {/* {userData && ( */}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            height: '367px'
          }}
        >
          <Grid item xs={6} lg={6}>
            <Grid container direction="column" justifyContent="flex-start">
              <Grid item>
                <Typography variant="h4">
                  Welcome {data?.fname} {data?.lname}!
                </Typography>

                {/* <Typography variant="h4">HR Core!</Typography> */}
              </Grid>

              <Grid item sx={{ pt: 1, pb: 1 }}>
                <Typography variant="h6">
                  Start managing your employees from anywhere!
                </Typography>
              </Grid>

              <Grid item sx={{ p: 1 }}>
                <Button variant="contained">Discover</Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6} lg={6}>
            <Grid container direction="row" justifyContent="flex-end">
              <CardMedia
                component="img"
                sx={{ width: 200 }}
                image="/images/Online presentation_Monochromatic.png"
                alt="Logo"
              />
            </Grid>
          </Grid>
        </Grid>
      {/* )} */}
    </RootStyle>
  );
}

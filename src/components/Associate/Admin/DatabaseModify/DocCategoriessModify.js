/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import DocumentIcon from "@mui/icons-material/Description";
import { useDispatch, useSelector } from "react-redux";
import { GET_REPORTS_LIST_REQUEST } from "../../../../reducers/reports/constants";

const DocCategoriesModify = () => {
  const { readReports, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_REPORTS_LIST_REQUEST,
    });
  }, [dispatch]);

  return (
    <Grid container direction="rows" justify="flex-start">
      <Grid item xs={12} lg={12} container spacing={2}>
        {readReports && readReports?.loading ? (
          <CircularProgress />
        ) : readReports && readReports.data && readReports.data.length > 0 ? (
          readReports &&
          readReports.data.map((r) => (
            <Grid item xs={4} lg={4}>
              <Card
                variant="outlined"
                sx={{
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <DocumentIcon fontSize="large" color="primary" />
                  <Typography variant="h6">{r.reportName}</Typography>
                  <Typography variant="body2">
                    By: {r?.createdBy?.firstName} {r?.createdBy?.lastName}
                  </Typography>
                  <Typography variant="body2">
                    Project: {r?.projectName}
                  </Typography>
                  <Typography variant="body2">
                    Created At: {r?.reportCreatedAt}
                  </Typography>

                  <Chip
                    label={"Status:" + r.reportStatus}
                    sx={{
                      fontWeight: 600,
                      //   "& .MuiChip-label": {
                      //     color: task.status === "approved" ? "white" : "black",
                      //   },
                    }}
                    size="small"
                    // sx={{ fontWeight: 600 }}
                    color={
                      r.reportStatus === "pending"
                        ? "warning"
                        : r.reportStatus === "rejected"
                        ? "error"
                        : "success"
                    }
                    variant={
                      r.reportStatus === "pending" ? "outlined" : "contained"
                    }
                  />
                </CardContent>
                <hr/>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    href={r.reportLink}
                    target={"_blank"}
                    startIcon={<DocumentIcon />}
                  >
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No Report Created </Typography>
        )}
      </Grid>
    </Grid>
  );
};
export default DocCategoriesModify;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Grid,
  Drawer,
  Box,
  Card,
  CardActions,
  Typography,
  Avatar,
  Divider,
  Skeleton,
  Button,
} from "@mui/material";

import "./ThanksCardElements/cardMedia.css";

const ThanksCard = ({ thanksId, thanksData, userId }) => {
  return (
    <>
      <Card
        sx={{
          margin: "10px 10px",
          width: "250px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: 400,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "900",
              color: "#4783db",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Stade AMAHORO Construction
          </Typography>
          <p
            style={{
              fontSize: "15px",
              fontWeight: "400",
              color: "#a0a0a0",
              margin: "10px",
            }}
          >
            200 Employees
          </p>
          <span
            style={{
              fontSize: "13px",
              fontWeight: "400",
              color: "#a0a0a0",
              margin: "10px",
              fontStyle: "italic",
            }}
          >
            From 2023/12/10 to 2024/12/10
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: "400",
              color: "#a0a0a0",
              margin: "10px",
              fontStyle: "italic",
            }}
          >
            Manager: GAKWAYA Innocent
          </span>
          <Button variant="contained">View More</Button>
        </Box>
      </Card>
    </>
  );
};

export default ThanksCard;

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
  Chip
} from "@mui/material";
import "./ThanksCardElements/cardMedia.css";
import NPDModal from "../modal";

const ThanksCard = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const [moreInfo, setMoreInfo] = useState({});
  const handleClose = () => {
    setShowMore(false);
  };

  const handleShowMore = (d) => {
    setShowMore(true);
    setMoreInfo(d);
  };
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
            {data?.projectName}
          </Typography>

          <span
            style={{
              fontSize: "13px",
              fontWeight: "400",
              color: "#a0a0a0",
              margin: "10px",
              fontStyle: "italic",
            }}
          >
            From {data?.projectStartDate} to {data?.projectEndDate}
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
            Manager: {data?.projectManagerName}
          </span>
          <Chip label={data?.projectStatus} color={data?.projectStatus === 'completed'? 'success': 'primary'}/>
          
        </Box>
      </Card>

      {/* <NPDModal  title={'More'} show={showMore} handleClose={handleClose}></NPDModal> */}
    </>
  );
};

export default ThanksCard;

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Chip,
  Skeleton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROJECT_REQUEST } from "../../reducers/project/constants";

const ThanksCard = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const { updateProject } = useSelector((state) => state);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAction = (status) => {
    const payload = {
      id: data?.assignmentId,
      name: data?.projectName,
      managerId: data?.projectManagerId,
      siteId: data?.projectSiteId,
      startdate: data?.projectStartDate,
      enddate: data?.projectEndDate,
      description: data?.projectDescription,
      status: status,
    };
    dispatch({
      type: UPDATE_PROJECT_REQUEST,
      payload,
    });
  };

  return (
    <Card>
      <CardActions
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <IconButton
          aria-label="more"
          aria-controls="task-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>
      </CardActions>
      <CardContent style={{ paddingTop: "40px" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          {data?.projectName}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            margin: "10px 0px",
          }}
        >
          From {data?.projectStartDate} to {data?.projectEndDate}
        </Typography>
        <span
          style={{
            fontSize: "13px",
            fontWeight: "400",
            color: "#a0a0a0",
            margin: "10px 0px",
            fontStyle: "italic",
            display: "block",
          }}
        >
          Manager: {data?.projectManagerName}
        </span>
        {updateProject?.loading ? (
          <Skeleton />
        ) : (
          <Chip
            label={data?.projectStatus}
            color={data?.projectStatus === "completed" ? "success" : "primary"}
          />
        )}
      </CardContent>
      <CardActions style={{ paddingTop: "20px" }}>
        <Menu
          id="task-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleAction("archived")}>
            Mark as Archived
          </MenuItem>
          <MenuItem onClick={() => handleAction("completed")}>
            Mark as Completed
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};

export default ThanksCard;

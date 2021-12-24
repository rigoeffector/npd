import {
  Button,
  Card,
  Grid,
  TextField,
  Chip,
  Typography,
  Stack,
  Box,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Collapse from "@mui/material/Collapse";
import moment from "moment";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useContext, useEffect } from "react";
import { associatesContext } from "../../utils/context/contexts";
import ApprovalTimeline from "./approverTimeline/approvalTimeline";
import ApprovalAvatar from "./approverTimeline/approvalAvatar";
import { ApproveTask } from "./taksFunctions";
import CategoryChip from "./CardElements/CategoryChip";
const TaskCard = ({ task, userID }) => {
  const { associates, setAssociates } = useContext(associatesContext);
  const [expanded, setExpanded] = useState(false);
  const getApproverDetails = (id) => {
    const associate = associates.filter((associatee) => associatee.id === id);
    return associate[0];
  };
  const requesterDetails = getApproverDetails(task.requester);
  const targetDetails = getApproverDetails(task.TargetValue);
  const [approverComments, setApproverComments] = useState();

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;

    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const getToApprove = () => {};

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const updateValues = (e) => {
    setApproverComments(e.target.value);
  };

  return (
    <Card sx={{ background: "#fff" }}>
      <Grid
        container
        direction="column"
        sx={{
          p: 2,
          "& .MuiTextField-root": { width: "100ch" },
        }}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Grid
                container
                direction="row"
                spacing={2}
                justifyContent="space-between"
              >
                <Grid item sx={{ pb: 1 }}>
                  <CategoryChip taskname={task.TaskName} />
                </Grid>
                <Grid item>
                  <Chip
                    label={task.status}
                    size="small"
                    sx={{ fontWeight: 600 }}
                    color={
                      task.status === "pending"
                        ? "warning"
                        : task.status === "rejected"
                        ? "error"
                        : "success"
                    }
                    variant={
                      task.status === "pending" ? "outlined" : "contained"
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box
            sx={{
              opacity: 0.7,
              fontSize: "12px",
              py: 1,
              fontStyle: "italic",
              maxWidth: "70%",
            }}
          >
            {task.Reason ? task.Reason : null}
          </Box>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sx={{ pb: 2 }}>
              <Grid container direction="rows" alignItems="center">
                <Typography variant="h7" sx={{ opacity: 0.5 }}>
                  by
                </Typography>
                <Grid item sx={{ pt: 1 }}>
                  <ApprovalAvatar
                    awidth={30}
                    aheight={30}
                    profilePicture={requesterDetails.profilePicture}
                    FirstName={requesterDetails.FirstName}
                    LastName={requesterDetails.LastName}
                    Title={requesterDetails.Title}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-end"
                alignItems="center"
              >
                <AccessTimeIcon fontSize="small" sx={{ opacity: 0.5 }} />
                <Typography variant="h7" sx={{ opacity: 0.5 }}>
                  {moment.unix(task.timestamp).format("D MMM YY")}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ opacity: 0.7, fontSize: "12px", pt: 1 }}>
          Target associate
        </Grid>
        {targetDetails && (
          <Grid item sx={{ pt: 1 }}>
            <ApprovalAvatar
              awidth={30}
              aheight={30}
              profilePicture={targetDetails.profilePicture}
              FirstName={targetDetails.FirstName}
              LastName={targetDetails.LastName}
              Title={targetDetails.Title}
            />
          </Grid>
        )}
        <Grid item sx={{ pt: 1 }}></Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            {!expanded ? (
              <Grid container direction="column" alignContent="flex-start">
                <Grid item sx={{ opacity: 0.7, fontSize: "12px", py: 1 }}>
                  Approval
                </Grid>
                <Grid item>
                  <AvatarGroup>
                    {Object.entries(task.approvers).map(([key, value]) => {
                      const { status } = value;
                      const approverDetails = getApproverDetails(key);
                      const statusColor = (status) => {
                        if (status === "pending") {
                          return "#ffa55a";
                        } else return "#49e51b";
                      };
                      return (
                        <Avatar
                          src={approverDetails.profilePicture}
                          sx={{
                            width: 20,
                            height: 20,

                            "&.MuiAvatar-root": {
                              border: `2px solid ${statusColor(status)}`,
                            },
                          }}
                        />
                      );
                    })}
                  </AvatarGroup>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
          <Grid item sx={{ mr: -1 }}>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon fontSize="small" />
            </ExpandMore>
          </Grid>
        </Grid>

        <Collapse in={expanded} unmountOnExit>
          {/* timeout="auto" */}
          <Grid item sx={{ opacity: 0.7, fontSize: "12px", pt: 1 }}>
            New {task.TaskName.split(" ").slice(0, 1)}
          </Grid>
          <Grid item sx={{ fontSize: "14px", pt: 1 }}>
            {task.Value}
          </Grid>
          {task.comments && (
            <>
              <Grid item sx={{ opacity: 0.7, fontSize: "12px", pt: 1 }}>
                Comments
              </Grid>
              <Grid
                item
                sx={{
                  fontSize: "14px",
                  pt: 1,
                  backgroundColor: "#ddd",
                  maxWidth: "300px",
                  "border-radius": "10px",
                }}
              >
                {task.comments}
              </Grid>
            </>
          )}

          <Grid item sx={{ opacity: 0.7, fontSize: "12px", pt: 1 }}>
            Approval
          </Grid>
          <Grid item>
            <ApprovalTimeline
              task={task}
              getApproverDetails={getApproverDetails}
            />
          </Grid>
          {userID && task.requester === userID && task.status === "pending" && (
            <Grid item sx={{ pt: 2 }}>
              <Button variant="outlined" color="error" size="small">
                Cancel Task
              </Button>
            </Grid>
          )}
          {task.approvers.hasOwnProperty(userID)
            ? task.approvers[userID].status === "pending" && (
                <Grid item sx={{ pt: 2 }}>
                  <Grid item sx={{ pb: 2 }}>
                    <TextField
                      label="Comment"
                      size="small"
                      style={{ width: "100%" }}
                      onChange={updateValues}
                    ></TextField>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item sx={{ pr: 1 }} md={6} xs={6} lg={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          ApproveTask(
                            "approved",
                            task,
                            requesterDetails,
                            userID,
                            approverComments,
                            userID
                          );
                        }}
                      >
                        Approve
                      </Button>
                    </Grid>
                    <Grid item sx={{ pr: 1 }} md={6} xs={6} lg={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => {
                          ApproveTask(
                            "rejected",
                            task,
                            requesterDetails,
                            userID,
                            approverComments,
                            userID
                          );
                        }}
                      >
                        Reject
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )
            : null}
        </Collapse>
      </Grid>
    </Card>
  );
};

export default TaskCard;
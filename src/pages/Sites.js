/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Page from "../components/Page";
import { DataTable } from "../components/table";
// import { CSVLink, CSVDownload } from "react-csv";
import {
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_SITES_LIST_REQUEST,
  DELETE_SITE_REQUEST,
} from "../reducers/sites/constants";
import AlertConfirmDialog from "../components/modal/confitm";

const Sites = () => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(false);
  const { listSites, deleteSite } = useSelector((state) => state);

  useEffect(() => {
    dispatch({
      type: GET_SITES_LIST_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
    if (deleteSite.success) {
      handleClose();
    }
  }, [deleteSite.success]);
  const handleDelete = (data) => {
    const { row } = data;
    setDeleteId(data.id);
    setShowDelete(true);
  };
  const handleClose = () => {
    setDeleteId("");
    setShowDelete(false);
  };

  const handleConfirm = () => {
    const payload = {
      id: deleteId,
    };
    dispatch({
      type: DELETE_SITE_REQUEST,
      payload,
    });
  };
  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Site name", width: 300 },
    { field: "location", headerName: "Location", flex: 2 },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
    },

    {
      field: "",
      headerName: "Action",
      type: "actions",
      width: 300,
      getActions: (params) => [
        // <div className="actions_button">
        //   <Button
        //     style={{
        //       borderRadius: "8px",
        //       border: "1px solid  #DCDFE5",
        //       background: "#F9FAFB",
        //       color: "#1090CB",
        //       fontSize: "14px",
        //       fontWeight: "600",
        //       lineHeight: "normal",
        //     }}
        //     // onClick={() => handleAssignAsset(params)}
        //   >
        //     Edit
        //   </Button>
        // </div>,
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

  return (
    <Page title=" Sites ">
      <AlertConfirmDialog
        show={showDelete}
        title={"Delete Project"}
        handleClose={handleClose}
        action={
          <Box>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleConfirm} autoFocus variant="contained">
              {deleteSite && deleteSite?.loading ? (
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
          {deleteSite && !deleteSite?.success && deleteSite.message && (
            <Alert variant="filled" severity="error">
              {deleteSite?.message}
            </Alert>
          )}
        </Box>
      </AlertConfirmDialog>
      <Box>
        <DataTable
          rows={listSites?.data || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </Page>
  );
};

export default Sites;

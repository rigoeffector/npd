/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useState } from "react";
import UserListHead from "../components/Associates/UserListHead";
import UserListToolbar from "../components/Associates/UserListToolbar";
import Label from "../components/Label";
import { Link } from "react-router-dom";
import Scrollbar from "../components/Scrollbar";
import * as moment from "moment";
import Page from "../components/Page";
import { DataTable } from "../components/table";
// import { CSVLink, CSVDownload } from "react-csv";
import { sentenceCase } from "change-case";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material";
import {
  associatesContext,
  resultsPerPageContext,
} from "../utils/context/contexts";

const Sites = () => {
  const { associates: associatesData, setAssociates: setAssociatesData } =
    useContext(associatesContext);
  const [filterName, setFilterName] = useState("");

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("LastName");

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Site name", flex: 1 },
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
            // onClick={() => handleAssignAsset(params)}
          >
            Edit
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
            // onClick={() => handleAssignAsset(params)}
          >
            Delete
          </Button>
        </div>,
      ],
    },
  ];

  const rows = [
    {
      id: 1,
      name: "Snow",
      location: "Kagarama",
      description: "Project Manager Manages This",
    },
    {
      id: 2,
      name: "Kibogora",
      location: "Kinyinya",
      description: "Nice Location",
    },
    {
      id: 3,
      name: "Musebeya",
      location: "Murindi",
      description: "Nice Location",
    },
  ];

  return (
    <Page title=" - ">
      <Box>
        <DataTable
          rows={rows}
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

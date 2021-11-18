import React, { useContext } from "react";
import { filter } from "lodash";
import { useState } from "react";
import UserListHead from "../components/Associates/UserListHead";
import UserListToolbar from "../components/Associates/UserListToolbar";
import Label from "../components/Label";
import { Link } from "react-router-dom";
import Scrollbar from "../components/Scrollbar";
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

const TABLE_HEAD = [
  { id: "", label: "    ", alignRight: false },
  { id: "", label: "    ", alignRight: false },
  { id: "FirstName", label: "First Name", alignRight: false },
  { id: "LastName", label: "Last Name", alignRight: false },
  { id: "Title", label: "Title", alignRight: false },
  { id: "Department", label: "Department", alignRight: false },
  { id: "EmplStatus", label: "Status", alignRight: false },
  { id: "" },
];

const Associates = () => {
  const { associates: associatesData, setAssociates: setAssociatesData } =
    useContext(associatesContext);
  const [filterName, setFilterName] = useState("");
  const { rowsPerPage, setRowsPerPage } = useContext(resultsPerPageContext);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [checked, setChecked] = useState(false);
  useState();
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - associatesData.length)
      : 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(array, comparator, query, status) {
    if (status && query) {
      return filter(
        array,
        (_user) =>
          _user.FirstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          _user.LastName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    } else if (query) {
      return filter(
        array,
        (_user) =>
          _user.FirstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          (_user.LastName.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
            _user.EmplStatus.indexOf("Employed") !== -1)
      );
    } else if (!status) {
      return filter(
        array,
        (_user) => _user.EmplStatus.indexOf("Employed") !== -1
      );
    }
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const filteredAssociates = applySortFilter(
    associatesData,
    getComparator(order, orderBy),
    filterName
  );

  return (
    <>
      <Box>
        <Container maxWidth="xl" sx={{ pb: 5 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h3" gutterBottom>
              Associates
            </Typography>
            <Button variant="contained" component={Link} to={"newassociate"}>
              New Associate
            </Button>
          </Stack>
          {associatesData && (
            <Card>
              <UserListToolbar
                filterName={filterName}
                onFilterName={handleFilterByName}
                setChecked={setChecked}
                checked={checked}
              />
              {/* <Scrollbar> */}
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={associatesData.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredAssociates
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((filteredassociate) => {
                        const {
                          id,
                          FirstName,
                          LastName,
                          EmplStatus,
                          Department,
                          profilePicture,
                          Title,
                        } = filteredassociate;

                        return (
                          <TableRow
                            style={{ textDecoration: "none" }}
                            key={id}
                            hover
                            sx={{ underline: "false" }}
                            component={Link}
                            to={`/dashboard/associates/${id}`}
                          >
                            <TableCell align="left" />
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0}
                              >
                                <Avatar
                                  src={profilePicture}
                                  alt="Profile Pic"
                                  sx={{ width: 40, height: 40 }}
                                />
                                {/* <Avatar src={filteredassociate.FirstName} />                                          */}
                              </Stack>
                            </TableCell>
                            <TableCell align="left">
                              <Typography
                                variant="subtitle2"
                                noWrap
                                style={{ textDecoration: "none" }}
                              >
                                {FirstName}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="subtitle2" noWrap>
                                {LastName}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">{Title}</TableCell>
                            <TableCell align="left">{Department}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={
                                  (EmplStatus === "Terminated" && "error") ||
                                  "success"
                                }
                              >
                                {sentenceCase(EmplStatus)}
                              </Label>
                            </TableCell>
                            <TableCell align="right">
                              {/* <UserMoreMenu /> */}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* </Scrollbar> */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredAssociates.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Associates;

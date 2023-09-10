/* eslint-disable no-unused-vars */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  DataGrid,
  GridLinkOperator,
  GridToolbar,
  GridToolbarQuickFilter,
  GridToolbarExport
} from "@mui/x-data-grid";
import "./index.css";
import { Box, Grid, withStyles } from "@material-ui/core";

import Button from "@mui/material/Button";
import * as XLSX from "xlsx";
import { TextField } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {
    background: "white",
    border: "1px solid var(--border-color) !important",
    fontWeight: "600",
    borderRadius: ".5rem !important",
    margin: "0px 10px !important",
    height: "40px",
    color: "var(--dark-blue-500) !important",
    "&:hover": {
      background: "white !important",
      color: "var(--dark-blue-500) !important",
      border: "2px solid var(--primary-color-500) !important",
    },
  },
}));

const StyledDataGrid = withStyles({
  root: {
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-cell": {
      color: "var(--dark-blue-500)",
      fontSize: "14px",
      height: "72px !important",
      borderBottom: "1px solid var(--border-color) !important",
      lineHeight: "unset !important",
      maxHeight: "none !important",
      whiteSpace: "normal",
    },
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: "1px solid var(--border-color) !important",
    },
    "& .MuiDataGrid-footerContainer": {
      border: "none !important",
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
      fontFamily: "var(--font-family-monospace)",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "500",
      color: "var(--dark-blue-500)",
      fontSize: "12px",
      fontFamily: "var(--font-family-monospace)",
    },
    "& .hideRightSeparator > .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
      {
        outline: "none",
      },
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
      outline: "none",
    },
  },
})(DataGrid);

export function DataTableCheckable(
  props,
  disableColumnFilter,
  loading,
  idName
) {
  const {
    rows,
    columns,
    rowsPerPageOptions = [],
    onSelectionModelChange,
    selectionModel,
    dropdownItems,
    dropdownFilterItems = false,
    onRowSelected,
    actions = [],
    identifier,
    checkboxSelection = true,
    showQuickSearchToolbar = true,
    enableReport = false,
  } = props;
  const [pageSize, setPageSize] = React.useState(20);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = React.useState(false);
  // const [selectedValue, setSelectedValue] = React.useState('');
  const getColumnsToExport = (columns) => {
    // Filter out columns with type "actions"
    return columns
      .filter((column) => column.type !== "actions")
      .map((column) => column.field);
  };
  const styles = {
    filterInput: {
      border: "1px solid #ccc",
      borderRadius: 4,
      paddingLeft: 8,
      paddingRight: 8,
    },
  };

  const filterColumns = ({ field, columnz, currentFilters }) => {
    // remove already filtered fields from list of columnz
    const filteredFields = currentFilters?.map((item) => item.field);
    return columnz
      .filter(
        (colDef) =>
          colDef.filterable &&
          (colDef.field === field || !filteredFields.includes(colDef.field))
      )
      .map((column) => column.field);
  };

  const getColumnForNewFilter = ({ currentFilters, columnz }) => {
    const filteredFields = currentFilters?.map(({ field }) => field);
    const columnForNewFilter = columnz
      .filter(
        (colDef) => colDef.filterable && !filteredFields.includes(colDef.field)
      )
      .find((colDef) => colDef.filterOperators?.length);
    return columnForNewFilter?.field ?? null;
  };

  const handleExport = () => {
    setIsExportDropdownOpen(!isExportDropdownOpen);
    // Filter out columns with type "checkbox" and "actions"
    const columnsToExport = columns
      .filter(
        (column) =>
          column.field !== "checkbox" &&
          column.type !== "actions" &&
          column.field !== "status" &&
          column.field !== "" &&
          column.field !== "driver"
      )
      .map((column) => column.field);

    // Prepare the data for export
    const dataForExport = rows.map((row) => {
      const rowData = {};
      columnsToExport.forEach((field) => {
        rowData[field] = row[field];
      });
      return rowData;
    });

    // Create a worksheet and workbook using XLSX
    const ws = XLSX.utils.json_to_sheet(dataForExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DataGrid Export");

    // Save the workbook as a file
    XLSX.writeFile(wb, "npd-attendance-report.xlsx");
  };
  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 4,
          pb: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
        // id={identifier ? identifier : 'search_table_v2'}
      >
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput) =>
            searchInput
              .split(",")
              .map((value) => value.trim())
              .filter((value) => value !== "")
          }
        />

        <div style={enableReport ? { display: "block" } : { display: "none" }}>
          {isExportDropdownOpen ? (
            // Render the export options when the dropdown is open
            <Button
              variant="outlined"
              onClick={handleExport}
              sx={{
                width: "200px",
              }}
            >
              Download Report
            </Button>
          ) : (
            // Render a button to open the dropdown when it's closed
            <Button
              variant="outlined"
              onClick={handleExport}
              sx={{
                width: "200px",
              }}
            >
              Download Report
            </Button>
          )}
        </div>
      </Box>
    );
  }

  return (
    <div className={idName} style={{ width: "100%" }}>
      {selectionModel?.length > 0 &&
        actions.map((action, actionIdx) => (
          <Button
            key={actionIdx}
            variant="outlined"
            sx={{
              margin: "0.5rem",
              textTransform: "none",
              borderRadius: "8px",
              color: "#000",
              border: "1px solid",
              background: "#c4cc36",
            }}
            onClick={action.click}
          >
            {action.name}
          </Button>
        ))}
      <StyledDataGrid
        sx={{
          boxShadow: 0,
          border: 0,
          color: "rgb(26 26 26 / 87%)",
          borderColor: "red",
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal",
            padding: "7px 0px",
          },
        }}
        // slots={{ toolbar: GridToolbar }}
        loading={loading}
        showQuickSearchToolbar={showQuickSearchToolbar}
        components={{
          Toolbar: showQuickSearchToolbar && QuickSearchToolbar,
          Export: showQuickSearchToolbar && GridToolbarExport,
        }}
        exportOptions={{
          columns: getColumnsToExport(columns), // Use the function to get columns to export
          fileName: "exported-data",
          exportButtonLabel: "Export",
        }}
        componentsProps={{
          toolbar: {
            className: idName,
            filterToolbarButton: {
              overrides: {
                FilterInput: {
                  style: styles.filterInput,
                },
              },
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          filterPanel: {
            filterFormProps: {
              filterColumns,
            },
            getColumnForNewFilter,
          },
        }}
        // disableColumnSelector
        // disableDensitySelector
        columns={columns}
        rows={rows}
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick={true}
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={selectionModel}
        dropdownItems={dropdownItems}
        dropdownFilterItems={dropdownFilterItems}
        onRowSelected={onRowSelected}
        autoHeight
        id={Math.random()}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        pagination
        rowsPerPageOptions={rowsPerPageOptions}
        getRowId={(r) => r.id}
        density={"standard"}
        getRowHeight={() => "auto"}
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLinkOperator.Or,
            },
          },
        }}
      />
    </div>
  );
}
export default DataTableCheckable;

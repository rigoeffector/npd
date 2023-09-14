/* eslint-disable no-unused-vars */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  DataGrid,
  GridLinkOperator,
  GridToolbar,
  GridToolbarQuickFilter,
  GridToolbarExport,
} from "@mui/x-data-grid";
import "./index.css";
import { Box, Grid, withStyles } from "@material-ui/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
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
    enableReport = true,
    reportName = "",
    subTitle = "",
    fileName = "",
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

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const handleExport = () => {
    setIsExportDropdownOpen(!isExportDropdownOpen);
  
    // Define the margin for each cell to create space between columns
    const cellMargin = [0, 5]; // [leftMargin, rightMargin]
  
    // Get the current date and time
    const currentDateTime = new Date().toLocaleString();
  
    // Define a regular expression for case-insensitive matching
    const excludeHeaderRegex = /(action|link)/i;
  
    // Define the PDF document definition
    const docDefinition = {
      content: [
        // Centered reportName
        { text: reportName, fontSize: 30, bold: true, alignment: 'center' },
        // Centered subTitle
        { text: subTitle, fontSize: 20, bold: true, alignment: 'center' },
        // Add current date and time
        { text: currentDateTime, fontSize: 14, alignment: 'center' },
        // Add a line separator
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5 }] },
        {
          table: {
            headerRows: 1,
            widths: columns.map(() => "auto"), // Adjust column widths as needed
            body: [
              // Make column.headerName font weight bold
              columns.map((column) => {
                if (excludeHeaderRegex.test(column.headerName)) {
                  return { text: '', bold: true }; // Exclude header
                } else {
                  return { text: column.headerName, bold: true };
                }
              }),
              ...rows.map((row) =>
                columns.map((column) => {
                  // Check if the header name matches the exclusion pattern
                  if (excludeHeaderRegex.test(column.headerName)) {
                    return { text: '', margin: cellMargin }; // Exclude cell
                  } else {
                    return {
                      text: row[column.field] || "",
                      margin: cellMargin, // Apply margin to create space between columns
                    };
                  }
                })
              ),
            ],
          },
          // Remove table borders
          layout: 'noBorders',
        },
      ],
    };
  
    // Generate the PDF
    const pdfDoc = pdfMake.createPdf(docDefinition);
  
    // Download the PDF
    pdfDoc.download(`${fileName}.pdf`);
  };
  
  

  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 4,
          pb: 0,
          mb: 5,
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

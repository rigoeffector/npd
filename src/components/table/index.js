import {withStyles} from '@material-ui/core';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import {DataGrid, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import React from 'react';
// import './style.css';
import * as XLSX from "xlsx";

const StyledDataGrid = withStyles({
    root: {
        '& .MuiDataGrid-renderingZone': {
            maxHeight: 'none !important'
        },
        '& .MuiDataGrid-cell': {
            lineHeight: 'unset !important',
            maxHeight: 'none !important',
            whiteSpace: 'normal'
        },
        '& .MuiDataGrid-row': {
            maxHeight: 'none !important',
            fontFamily: 'var(--font-family-monospace)'
        },
        '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: '700',
            color: '#404a69 !important',
            fontFamily: 'var(--font-family-monospace)'
        }
    }
})(DataGrid);


export function DataTable(props) {
    const {rows = [], columns = [], rowsPerPageOptions = [], loading = false, pageSize = 5, onPageSizeChange} = props;
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
      XLSX.writeFile(wb, "npd-report.xlsx");
    };

    function QuickSearchToolbar() {
        return (
          <Box
            sx={{
              p: 4,
              pb: 0,
              mb:5,
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
    
            <div>
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
        <div style={{width: '100%'}}>
            <StyledDataGrid
                sx={{
                    boxShadow: 0,
                    border: 0,
                    color: 'rgb(26 26 26 / 87%)',
                    borderColor: '#ddd',
                    '& .MuiDataGrid-cell': {
                        whiteSpace: 'normal',
                        padding: '7px 0px'
                    }
                }}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                columns={columns}
                rows={rows}
                loading={loading}
                autoHeight
                id={Math.random()}
                pageSize={pageSize}
                onPageSizeChange={onPageSizeChange}
                pagination
                rowsPerPageOptions={rowsPerPageOptions}
                getRowId={(r) => r.id}
                density="standard"
                getRowHeight={() => 'auto'}
                components={{Toolbar: QuickSearchToolbar}}
                initialState={{
                    filter: {
                        filterModel: {
                            items: []
                        }
                    }
                }}
            />
        </div>
    );
}
export default DataTable;

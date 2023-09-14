import {withStyles} from '@material-ui/core';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import {DataGrid, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import React from 'react';
// import './style.css';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
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
    const {rows = [], columns = [], rowsPerPageOptions = [], loading = false, pageSize = 5, onPageSizeChange, enableReport=true, reportName='', subTitle='', fileName=''} = props;
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
  
  
    
    // const handleExport = () => {
    //   setIsExportDropdownOpen(!isExportDropdownOpen);
    
    //   // Create a new worksheet
    //   const ws = XLSX.utils.aoa_to_sheet([["NPD Cotraco"]]); // Add the header
    
    //   // Create a new workbook
    //   const wb = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, "Report"); // Name the worksheet "Report"
    
    //   // Add an image to the worksheet
    //   const imgSrc = '/images/logo.jpeg'; // Specify the path to your image in the public directory
    //   ws["A1"].s = { patternType: "solid", fgColor: { rgb: "FFFFFF" } }; // Set cell background color
    //   ws["A1"].l = { Target: imgSrc, Tooltip: "NPD Logo" }; // Link to the image
    //   ws["A1"].c = [{ x: { alignment: { horizontal: "center" } } }]; // Center align the content
    
    //   // Add the data for export
    //   const columnsToExport = columns
    //     .filter(
    //       (column) =>
    //         column.field !== "checkbox" &&
    //         column.type !== "actions" &&
    //         column.field !== "status" &&
    //         column.field !== "" &&
    //         column.field !== "driver"
    //     )
    //     .map((column) => column.field);
    
    //   const dataForExport = rows.map((row) => {
    //     const rowData = {};
    //     columnsToExport.forEach((field) => {
    //       rowData[field] = row[field];
    //     });
    //     return rowData;
    //   });
    
    //   // Add the data to the worksheet
    //   XLSX.utils.sheet_add_json(ws, dataForExport, {
    //     header: columnsToExport,
    //     skipHeader: true,
    //     origin: "A3", // Start data from A3 (below the header and image)
    //   });
    
    //   // Save the workbook as a file
    //   XLSX.writeFile(wb, "npd-report.xlsx");
    // };
    

    // old way working well 
    // const handleExport = () => {
    //   setIsExportDropdownOpen(!isExportDropdownOpen);
    
    //   // Create a new workbook
    //   const wb = XLSX.utils.book_new();
    
    //   // Create a new worksheet
    //   const ws = XLSX.utils.aoa_to_sheet([[reportName], [], [subTitle]]); // Add reportName in A1, leave A2 empty, and add subTitle in A3
    
    //   // Style for reportName (A1)
    //   const reportNameStyle = {
    //     font: { bold: true, sz: 30 }, // Bold and font size 30
    //   };
    
    //   // Apply the style to the A1 cell (reportName)
    //   ws["A1"].s = reportNameStyle;
    
    //   // Add the data for export
    //   const columnsToExport = columns
    //     .filter(
    //       (column) =>
    //         column.field !== "checkbox" &&
    //         column.type !== "actions" &&
    //         column.field !== "status" &&
    //         column.field !== "" &&
    //         column.field !== "driver"
    //     )
    //     .map((column) => ({
    //       header: column.headerName || "", // Use headerName as the column header text
    //       field: column.field, // Include the field property
    //     }));
    
    //   // Add the column headers starting from row 5
    //   XLSX.utils.sheet_add_aoa(ws, [columnsToExport.map((col) => col.header)], { origin: "A5" });
    
    //   // Add the data rows starting from row 6
    //   const dataForExport = rows.map((row) =>
    //     columnsToExport.map((column) => {
    //       if (column.field !== "") {
    //         return row[column.field] || ""; // Display data in the corresponding column
    //       }
    //       return ""; // For empty columns, leave the cell empty
    //     })
    //   );
    
    //   XLSX.utils.sheet_add_aoa(ws, dataForExport, { origin: "A6" });
    
    //   // Add the data worksheet to the workbook
    //   XLSX.utils.book_append_sheet(wb, ws, "Data");
    
    //   // Save the workbook as a file
    //   XLSX.writeFile(wb, `${fileName}.xlsx`);
    // };


 

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const handleExport = () => {
  setIsExportDropdownOpen(!isExportDropdownOpen);

  // Define the margin for each cell to create space between columns
  const cellMargin = [0, 5]; // [leftMargin, rightMargin]

  // Get the current date and time
  const currentDateTime = new Date().toLocaleString();

  // Define a regular expression for case-insensitive matching
  const excludeHeaderRegex = /(action|link|emergency|emerge|DOB|site|ID)/i;

  // Define the PDF document definition with landscape orientation
  const docDefinition = {
    // Set the entire PDF to landscape mode
    pageOrientation: 'landscape',

    content: [
      // Centered reportName
      { text: reportName, fontSize: 30, bold: true, alignment: 'center' },
      // Centered subTitle
      { text: subTitle, fontSize: 20, bold: true, alignment: 'center' },
      // Add current date and time after subTitle
      { text: currentDateTime, fontSize: 14, alignment: 'center' },
      // Add space between date/time and the line separator
      { margin: [0, 10], text: ' ' },
      // Add a line separator
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 820, // Adjust the width to span the entire landscape page
            y2: 0,
            lineWidth: 0.5,
          },
        ],
      },
      // Add space between the line and the table data
      { margin: [0, 10], text: ' ' },
      {
        // Center-align the entire table horizontally
        table: {
          headerRows: 1,
          width: '100%', // Make the table width fit the entire page size
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
          // Center-align the entire table horizontally
          alignment: 'center',
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

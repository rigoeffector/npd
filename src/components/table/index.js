import {withStyles} from '@material-ui/core';
import Box from '@mui/material/Box';
import {DataGrid, GridToolbarExport, GridToolbarQuickFilter} from '@mui/x-data-grid';
import React from 'react';
// import './style.css';

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

function QuickSearchToolbar() {
    return (
        <Box
            id="search_bar"
            sx={{
                display: 'flex'
            }}
        >
            <GridToolbarQuickFilter
                quickFilterParser={(searchInput) =>
                    searchInput
                        .split(',')
                        .map((value) => value.trim())
                        .filter((value) => value !== '')
                }
            />
            <GridToolbarExport printOptions={{disableToolbarButton: true}} csvOptions={{disableToolbarButton: true}} />
        </Box>
    );
}
export function DataTable(props) {
    const {rows = [], columns = [], rowsPerPageOptions = [], loading = false, pageSize = 5, onPageSizeChange} = props;

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

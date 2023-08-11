import React from 'react';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
// import EmployeesPage from './EmployeesPage';
import Grid from '@material-ui/core/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));
// function actionCellRenderer(params) {
//     let eGui = document.createElement("div");

//     let editingCells = params.api.getEditingCells();
//     // checks if the rowIndex matches in at least one of the editing cells
//     let isCurrentRowEditing = editingCells.some((cell) => {
//         return cell.rowIndex === params.node.rowIndex;
//     });

//     if (isCurrentRowEditing) {
//         eGui.innerHTML = `
//   <button  class="action-button update"  data-action="update"> update  </button>
//   <button  class="action-button cancel"  data-action="cancel" > cancel </button>
//   `;
//     } else {
//         eGui.innerHTML = `
//   <button class="action-button edit"  data-action="edit" > edit  </button>
//   <button class="action-button delete" data-action="delete" > delete </button>
//   `;
//     }

//     return eGui;
// }

class GridExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: "Logo", field: "logo" },
                { headerName: "Name", field: "name", min: 200, editable: true },
                { headerName: "Description", field: "description", minWidth: 200, editable: true },
                { headerName: "Employees", field: "employees", minWidth: 200 },
                { headerName: "Location", field: "location", minWidth: 200, filter: 'agTextColumnFilter' },
                { headerName: "Action", field: "action", editable: false }

            ],
            rowData: [
                { logo: "Toyota", name: "Michael Phelps", description: "35000", employees: "Michael", location: "United States" },
                { logo: "Toyota", name: "Natalie Coughlin", description: "35000", employees: "Natalie", location: "Australia" },
                { logo: "Toyota", name: "Alicia", description: "35000", employees: "Alicia", location: "Italy" },
                { logo: "Toyota", name: "Missy Franklin", description: "35000", employees: "Franklin", location: "Great Britain" },
                { logo: "Toyota", name: "Jenny Thompson", description: "35000", employees: "Jenny", location: "Netherlands" },
                { logo: "Toyota", name: "Cindy Klassen", description: "35000", employees: "Cindy", location: "Germany" },
            ],
            defaultColDef: { sortable: true }
        }
    }
    onCellClicked(params) {
        // Handle click event for action cells
        if (params.column.colId === "action" && params.event.target.dataset.action) {
            let action = params.event.target.dataset.action;

            if (action === "edit") {
                params.api.startEditingCell({
                    rowIndex: params.node.rowIndex,
                    // gets the first columnKey
                    colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
                });
            }

            if (action === "delete") {
                params.api.applyTransaction({
                    remove: [params.node.data]
                });
            }

            if (action === "update") {
                params.api.stopEditing(false);
            }

            if (action === "cancel") {
                params.api.stopEditing(true);
            }
        }
    }
    // const [rowData, setRowData] = useState();
    // const onGridReady = useCallback((params) => {
    //     fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //         .then((resp) => resp.json())
    //         .then((data) => setRowData(data));
    // }, []);
    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container rowSpacing={3}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <div className="containerStyle" style={{ width: '100%', height: '100%' }}>
                                <div className="gridStyle" style={{ width: '100%', height: '100%' }}>
                                    <div
                                        className="ag-theme-alpine"
                                        style={{
                                            height: '500px'
                                        }}
                                    >
                                        <AgGridReact
                                            columnDefs={this.state.columnDefs}
                                            rowData={this.state.rowData}
                                            defaultColDef={this.state.defaultColDef}
                                            sideBar={'filters'}
                                            animateRows={true}
                                            onCellClicked={this.onCellClicked}
                                        // onGridReady={onGridReady}
                                        >
                                        </AgGridReact>
                                    </div>
                                </div>
                            </div>
                        </Item>
                    </Grid>
                </Grid>
            </Box>

        );
    }
}
export default GridExample
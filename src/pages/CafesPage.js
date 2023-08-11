/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Grid, Button } from '@material-ui/core'
import FormDialog from '../components/cafedialog';
import Employeelist from '../pages/Employeelist';
const initialValue = { logo:"", name: "", description: "", employees: "", location:""}
function CafesPage() {
  const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };
  
  const url = `http://localhost:3000/CafesPage`
  const rowHeight = 50;
  function LinkCellRenderer(props) {
    return (
      <a
        target="_self"
        rel="noopener noreferrer"
        href={"../pages/Employeelist" + props.value}
      >
        {props.value}
      </a>
      // <Link to={`/?employees=${props.data.Id}`}>"+{props.value}+"</Link>
    );
  }
  const columnDefs = [
    { headerName: "ID", field: "id"},
    { headerName: "Logo", field: "logo" },
        { headerName: "Name", field: "name", filter: 'agTextColumnFilter' },
        { headerName: "Description", field: "description",filter: 'agTextColumnFilter' },
        { headerName: "Employees", field: "employees",  filter: 'agTextColumnFilter', cellRenderer: "LinkCellRenderer" },
        { headerName: "Location", field: "location",  filter: 'agTextColumnFilter' },
    {
      headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
        <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>Update</Button>
        <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>Delete</Button>
      </div>
    }
  ]
  // Example of consuming Grid Event
  const cellClickedListener = useCallback( event => {
    if(event && event.column && event.column.colDef.field === "employees") {
      props.history.push(`/${event.value}`);
  }
    console.log('cellClicked', event);
  }, []);
 
  // calling getUsers function for first time 
  useEffect(() => {
    getUsers()
  }, [])

  //fetching user data from server
  const getUsers = () => {
    fetch(url).then(resp => resp.json()).then(resp => setTableData(resp))
  }
  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value,id)
    setFormData({ ...formData, [id]: value })
  }
  const onGridReady = (params) => {
    setGridApi(params)
  }
  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }
  //deleting a user
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getUsers())

    }
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user 
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()

        })
    } else {
      // adding new user
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }
  }

  return (
    <div className="CafesPage">
      <h1 align="center">React-App</h1>
      <h3 align="center">CRUD Operation with Json-server in AG-Grid</h3>
      <Grid align="right">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Add New Cafe</Button>
      </Grid>
      <div className="ag-theme-alpine">
        <AgGridReact  
          rowData={tableData}
          rowHeight={rowHeight}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
          domLayout="autoHeight"
          sideBar={'filters'}
          defaultColDef={{ filter: true, floatingFilter: true, sortable: true }}
          onGridReady={onGridReady}
          onCellClicked={cellClickedListener}
          frameworkComponents={{
            LinkCellRenderer
          }}
        />
      </div>
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default CafesPage;
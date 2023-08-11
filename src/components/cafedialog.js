import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
// import { useForm } from "react-hook-form";
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl'
// import FormLabel from '@material-ui/core/FormLabel';


export default function FormDialog({open,handleClose,data,onChange,gender,handleFormSubmit}) {
 const {id,logo,name,description,employees,location}=data
 const MIN_CHARACTER_LIMIT = 6;
 const MAX_CHARACTER_LIMIT = 10;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"Update user":"Create new user"}</DialogTitle>
        <DialogContent>
         <form>
             <TextField  id="logo" value={logo} onChange={e=>onChange(e)} placeholder="Enter logo" label="Logo"  variant="outlined" margin="dense" fullWidth />
             <TextField  id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" inputProps={{minlength: MIN_CHARACTER_LIMIT,maxlength: MAX_CHARACTER_LIMIT}} helperText={`${name.length}/${MAX_CHARACTER_LIMIT}`} variant="outlined" margin="dense" fullWidth />
             <TextField  id="description" value={description} onChange={e=>onChange(e)} placeholder="Enter description" label="Description"  variant="outlined" margin="dense" fullWidth />
             <TextField id="employees" value={employees} onChange={e=>onChange(e)} placeholder="Enter employees" label="Employees" variant="outlined" margin="dense" fullWidth />
             {/* <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
             <RadioGroup aria-label="gender" id="gender" value={gender} onChange={e=>onChange(e)} >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
              </FormControl> */}
             <TextField id="location" value={location} onChange={e=>onChange(e)} placeholder="location" label="Location" variant="outlined" margin="dense" fullWidth />
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
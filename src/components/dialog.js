import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { useForm } from "react-hook-form";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel';


export default function FormDialog({open,handleClose,data,onChange,gender,handleFormSubmit}) {
 const {id,name,email,phone,daysworked, caféname}=data
 const MIN_CHARACTER_LIMIT = 6;
 const MAX_CHARACTER_LIMIT = 10;
 const { register} = useForm();
//  const genderItems = [
//   { id: 'male', title: 'Male' },
//   { id: 'female', title: 'Female' }
// ]
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
             <TextField  id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" inputProps={{minlength: MIN_CHARACTER_LIMIT,maxlength: MAX_CHARACTER_LIMIT}} helperText={`${name.length}/${MAX_CHARACTER_LIMIT}`} variant="outlined" margin="dense" fullWidth />
             <TextField  id="email" value={email} onChange={e=>onChange(e)} placeholder="Enter email" label="Email address"  inputRef={register({required: true,pattern: /\S+@\S+\.\S+/})}variant="outlined" margin="dense" fullWidth />
             <TextField id="phone" value={phone} onChange={e=>onChange(e)} placeholder="Enter phone number" label="Phone number" variant="outlined" margin="dense" fullWidth />
             <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
             <RadioGroup aria-label="gender" id="gender" value={gender} onChange={e=>onChange(e)} >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
              </FormControl>
             <TextField id="daysworked" value={daysworked} onChange={e=>onChange(e)} placeholder="Days worked in the cafe" label="Days worked in the cafe" variant="outlined" margin="dense" fullWidth />
             <TextField id="caféname" value={caféname} onChange={e=>onChange(e)} placeholder="Café name" label="Café name" variant="outlined" margin="dense" fullWidth />
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
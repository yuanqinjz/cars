import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Car } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCar } from '../api/carapi';
import CarDialogContent from './CarDialogContent';
import Button from '@mui/material/Button';
function AddCar() {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
    
  // Close the modal form
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>
  {
    setCar({...car, [event.target.name]:
        event.target.value});
  }
  const queryClient = useQueryClient();
  // Add inside the AddCar component function
  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });
  const handleSave = () => {
    mutate(car);   
    setCar({ brand: '', model: '', color: '',  registrationNumber:'',
             modelYear: 0, price: 0 });
    handleClose();
  }
return(
    <>
        <Button onClick={handleClickOpen}>New Car</Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange}/>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
        </DialogActions>
        </Dialog>            
    </>
  );
}
export default AddCar;

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from '../api/carapi';
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCar from './AddCar';
import EditCar from './EditCar';

function Carlist() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { data, error, isLoading, isSuccess} = useQuery({
        queryKey: ["cars"],
        queryFn: getCars
    })

    const { mutate } = useMutation(deleteCar, {
        onSuccess: () => {
           // Car deleted
           queryClient.invalidateQueries({queryKey: ["cars"]});
           setOpen(true);
         },
         onError: (err) => {
           console.error(err);
         },
     });
    const columns: GridColDef[] = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'registrationNumber', headerName: 'Reg.nr.', width: 150},
        {field: 'modelYear', headerName: 'Model Year', width: 150},
        {field: 'price', headerName: 'Price', width: 150},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => 
              <EditCar cardata={params.row} />
          },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <IconButton aria-label="delete" size="small"
                onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${params.row.
                        brand} ${params.row.model}?`)) {
                            mutate(params.row._links.car.href);
                    }
                }}
                >
                <DeleteIcon fontSize="small" />
              </IconButton>
            ),
          },
      ];
    return (
        <>
            <AddCar></AddCar>
            {isLoading && <span>Loading</span>}
            {error && <span>Error when fetch cars</span>}
            {isSuccess && <DataGrid
                            rows={data}
                            columns={columns}
                            slots={{ toolbar: GridToolbar }}
                            disableRowSelectionOnClick={true}
                            getRowId={row => row._links.self.href}/>
            }
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="Car deleted" />
        </>
    );
}

export default Carlist;
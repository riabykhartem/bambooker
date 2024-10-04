import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import { addReservation } from '../api/reservationsApi';
import { Dayjs } from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { DeskFeature } from '../../../models/desk.model';


export interface ReservationDialogProps {
  deskId: string;
  deskName: string;
  deskFeatures: DeskFeature[];
  selectedDate: Dayjs;
  dialogIsOpen: boolean;
  onClose: () => void;
}

const DialogStyled = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#f0f0f0", // Custom background color
    DisplaySettings: "flex",
    color: "#333", // Custom text color
    padding: theme.spacing(2), // Custom padding
    borderRadius: "20px", // Custom border radius
  },
}));

export function ReservationDialog(props: ReservationDialogProps) {

  const reserveMutation = useMutation({
    mutationFn: addReservation,
    mutationKey: ['reservation'],
    onSuccess: () => {
      console.log('resevation added');
      enqueueSnackbar(`Desk ${props.deskName} will be waiting for you on ${props.selectedDate.format("MM-DD-YYYY")}`, {
        variant: 'success',
        autoHideDuration: 3000
      });
    },

    onError: () => {
      enqueueSnackbar("OOps... reservation has failed", {
        variant: 'error',
        autoHideDuration: 5000
      });
    },
  });

  const handleConfirmButton = async () => {
    props.onClose();
    reserveMutation.mutate({ deskId: props.deskId, deskName: props.deskName, deskFeatures: props.deskFeatures, date: props.selectedDate });
  };


  return (
    <DialogStyled onClose={props.onClose} open={props.dialogIsOpen}>
      <DialogTitle>Confirm reservation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          DATE: {props.selectedDate.format("MM-DD-YYYY")}
        </DialogContentText>
      </DialogContent>
      <Button onClick={() => props.onClose()}>Cancel</Button>
      <Button variant="outlined" onClick={handleConfirmButton} disabled={reserveMutation.isPending}>
        Reserve
      </Button>
    </DialogStyled>
  );
}
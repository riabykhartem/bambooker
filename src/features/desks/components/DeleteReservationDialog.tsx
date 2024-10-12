import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import { deleteReservation } from '../api/reservationsApi';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import Reservation from '../../../models/reservations.model';

export interface DeleteReservationDialogProps {
  reservation: Reservation,
  dialogIsOpen: boolean,
  onClose: () => void,
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

export function DeleteReservationDialog(props: DeleteReservationDialogProps) {

  const reserveMutation = useMutation({
    mutationFn: deleteReservation,
    mutationKey: ['deleteReservation'],
    onSuccess: () => {
      console.log('resevation deleted');
      enqueueSnackbar(`Reservation of the desk ${props.reservation.deskName} on ${props.reservation.date} has been deleted`, {
        variant: 'success',
        autoHideDuration: 3000
      });
    },

    onError: () => {
      enqueueSnackbar("OOps... cancellation has failed", {
        variant: 'error',
        autoHideDuration: 5000
      });
    },
  });

  const handleConfirmButton = async () => {
    props.onClose();
    reserveMutation.mutate(props.reservation.id);
  };


  return (
    <DialogStyled onClose={props.onClose} open={props.dialogIsOpen}>
      <DialogTitle>Confirm reservation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Do you want to cancel reservation of desk ${props.reservation.deskName} on ${props.reservation.date.format("MM-DD-YYYY")}?`}
        </DialogContentText>
      </DialogContent>
      <Button onClick={() => props.onClose()}>Cancel</Button>
      <Button variant="outlined" onClick={handleConfirmButton} disabled={reserveMutation.isPending}>
        Delete
      </Button>
    </DialogStyled>
  );
}
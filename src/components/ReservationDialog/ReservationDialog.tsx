import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { addReservation } from '../../api/api';
import { Dayjs } from 'dayjs';
import { useMutation } from '@tanstack/react-query';


export interface ReservationDialogProps {
    deskId: string;
    selectedDate: Dayjs;
    dialogIsOpen: boolean;
    onClose: () => void;

}

export function ReservationDialog(props: ReservationDialogProps) {

    const reserveMutation = useMutation({
        mutationFn: addReservation,
        mutationKey: ['reservation'],
        onSuccess: () => {
            console.log('resevation added');
        },
        onError: error => {
            console.error('adReseervation error', error); // <- stay
        },


    })

    const handleConfirmButton = async () => {
        reserveMutation.mutate({ deskId: props.deskId, date: props.selectedDate });
        props.onClose()
    }


    return (
        <Dialog onClose={props.onClose} open={props.dialogIsOpen}>
            <DialogTitle>Confirm reservation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    DATE: {props.selectedDate.format("MM-DD-YYYY")}
                </DialogContentText>

            </DialogContent>
            <Button variant="outlined" onClick={handleConfirmButton} disabled={reserveMutation.isPending}>
                Reserve
            </Button>
        </Dialog>
    )
}
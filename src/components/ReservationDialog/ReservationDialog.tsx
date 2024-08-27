import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import { addReservation } from '../../api/api';
import { Dayjs } from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import Reservation from '../../api/reservations.model';


export interface ReservationDialogProps {
    deskId: string;
    selectedDate: Dayjs;
    dialogIsOpen: boolean;
    onClose: () => void;
    handleSnackbar: (result: Error | Reservation) => void;
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
        },
        onError: error => {
            props.handleSnackbar(error)
        },


    })

    const handleConfirmButton = async () => {
        props.onClose()
        reserveMutation.mutate({ deskId: props.deskId, date: props.selectedDate });
    }


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
    )
}
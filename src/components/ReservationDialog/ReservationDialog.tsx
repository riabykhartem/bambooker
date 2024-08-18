import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export interface ReservationDialogProps {
    deskId: string;
    dialogIsOpen: boolean;
    handleDialogClose: () => void;
    handleConfirmButton: () => void
}

export function ReservationDialog(props: ReservationDialogProps) {

    return (
        <Dialog onClose={props.handleDialogClose} open={props.dialogIsOpen}>
            <Button variant="outlined" onClick={props.handleConfirmButton}>
                Reserve
            </Button>
        </Dialog>
    )
}
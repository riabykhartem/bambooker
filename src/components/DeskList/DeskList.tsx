/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState, } from 'react';
import { getDesks } from '../../api/api';
import { Desk } from '../../api/desk.model';
import { MainLayout } from '../../layouts/MainLayout.tsx';
import { DeskCard } from '../DeskCard/DeskCard.tsx';
import { Button, List, ListItem } from '@mui/material';
import { Dayjs } from 'dayjs';
import { ReservationDialog } from '../ReservationDialog/ReservationDialog.tsx'
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Reservation from '../../api/reservations.model.ts';


export interface DeskListProps {
  locationId: string,
  searchValue: string,
  selectedDate: Dayjs | null
}

export const DeskList = (props: DeskListProps) => {
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    message: '',
    Transition: Slide,
  });
  const [desks, setDesks] = useState<Desk[]>([]);
  const [selectedDesk, setSelectedDesk] = useState<string | null>(null)
  const elementRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    console.log("desklist rerendered");
    getDesks({ locationId: props.locationId, searchTerm: props.searchValue, selectedDate: props.selectedDate ?? undefined })
      .then(desklist => {
        setDesks(desklist)
      })
  }, [props.locationId, props.searchValue, props.selectedDate]);

  const OnReserve = (deskId: string) => {
    setSelectedDesk(deskId)
  }

  const onClose = () => {
    setSelectedDesk(null)
    elementRef.current?.focus()
  }

  const handleSnackbar = (result: Error | Reservation) => {
    if (result instanceof Error) {
      setSnackbarState({
        open: true,
        message: "OOps... reservation has failed",
        Transition: Slide,
      });
    } else {
      setSnackbarState({
        open: true,
        message: `${selectedDesk} has been reserved`,
        Transition: Slide,
      });
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false })
  }


  return (
    <>
      <MainLayout>
        <Button ref={elementRef}>example</Button>
        <List sx={{
          width: '360px'
        }}>
          {desks.map((desk) => (
            <ListItem key={desk.id}>
              <DeskCard {...desk} OnReserve={OnReserve} />
            </ListItem>
          ))}
        </List>

        <Snackbar
          open={snackbarState.open}
          onClose={handleSnackbarClose}
          TransitionComponent={snackbarState.Transition}
          message={snackbarState.message}
          key={snackbarState.Transition.name}
          autoHideDuration={1000}
        />
      </MainLayout>
      {props.selectedDate && selectedDesk && <ReservationDialog dialogIsOpen={!!selectedDesk} onClose={onClose} selectedDate={props.selectedDate} deskId={selectedDesk} handleSnackbar={handleSnackbar} />}

    </>
  )
}
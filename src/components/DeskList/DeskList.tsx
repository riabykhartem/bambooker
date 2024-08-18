import { useEffect, useState } from 'react';
import { addReservation, getDesks } from '../../api/api';
import { Desk } from '../../api/desk.model';
import { MainLayout } from '../../layouts/MainLayout.tsx';
import { DeskCard } from '../DeskCard/DeskCard.tsx';
import { List, ListItem } from '@mui/material';
import { Dayjs } from 'dayjs';
import { ReservationDialog } from '../ReservationDialog/ReservationDialog.tsx'


export interface DeskListProps {
  locationId: string,
  searchValue: string,
  selectedDate: Dayjs | null
}

export const DeskList = (props: DeskListProps) => {
  // console.log('DeskList is rendering...');
  const [desks, setDesks] = useState<Desk[]>([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [selectedDesk, setSelectedDesk] = useState<string>('')

  useEffect(() => {
    console.log("desklist rerendered");
    getDesks({ locationId: props.locationId, searchTerm: props.searchValue, selectedDate: props.selectedDate ?? undefined })
      .then(desklist => {
        setDesks(desklist)
      })
  }, [props.locationId, props.searchValue, props.selectedDate]);

  const handleOnReserve = (deskId: string) => {
    setSelectedDesk(deskId)
    setDialogIsOpen(true)
  }

  const handleDialogClose = () => {
    setDialogIsOpen(false)
    setSelectedDesk('')
  }

  const handleConfirmButton = () => {
    addReservation({ deskId: selectedDesk, date: props.selectedDate })
      .then((res) => {
        console.log(res);
        setDialogIsOpen(false)
      })

  }

  return (
    <>
      <MainLayout>
        <List sx={{
          width: '360px'
        }}>
          {desks.map((desk) => (
            <ListItem key={desk.id}>
              <DeskCard {...desk} onReserveClick={handleOnReserve} />
            </ListItem>
          ))}
        </List>
      </MainLayout>
      <ReservationDialog dialogIsOpen={dialogIsOpen} handleConfirmButton={handleConfirmButton} handleDialogClose={handleDialogClose} />
    </>
  )
}
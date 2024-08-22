import { useEffect, useState } from 'react';
import { getDesks } from '../../api/api';
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
  const [selectedDesk, setSelectedDesk] = useState<string | null>(null)

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
  }

  return (
    <>
      <MainLayout>
        <List sx={{
          width: '360px'
        }}>
          {desks.map((desk) => (
            <ListItem key={desk.id}>
              <DeskCard {...desk} OnReserve={OnReserve} />
            </ListItem>
          ))}
        </List>
      </MainLayout>
      <ReservationDialog dialogIsOpen={!!selectedDesk} onClose={onClose} selectedDate={props.selectedDate} deskId={selectedDesk} />
    </>
  )
}
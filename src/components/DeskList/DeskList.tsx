import { useEffect, useState } from 'react';
import { getDesks } from '../../api/api';
import { Desk } from '../../api/desk.model';
import { MainLayout } from '../../layouts/MainLayout.tsx';
import { DeskCard } from '../DeskCard/DeskCard.tsx';
import { List, ListItem } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';


export interface DeskListProps {
  locationId: string,
  searchValue: string,
  selectedDate: Dayjs | null
}

export const DeskList = (props: DeskListProps) => {

  // console.log('DeskList is rendering...');

  const [desks, setDesks] = useState<Desk[]>([]);

  useEffect(() => {
    console.log("desklist rerendered");
    getDesks({ locationId: props.locationId, searchTerm: props.searchValue, selectedDate: props.selectedDate ?? undefined })
      .then(desklist => {
        setDesks(desklist)
      })
  }, [props.locationId, props.searchValue, props.selectedDate]);

  return (
    <MainLayout>
      <List sx={{
        width: '360px'
      }}>
        {desks.map((desk) => (
          <ListItem key={desk.id}>
            <DeskCard {...desk} />
          </ListItem>
        ))}
      </List>
    </MainLayout>
  )
}
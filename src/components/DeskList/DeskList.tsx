import { useEffect, useState } from 'react';
import { addAvailablility, getDesks } from '../../api/api';
import { Desk } from '../../api/desk.model';
import { MainLayout } from '../../layouts/MainLayout.tsx';
import { DeskCard } from '../DeskCard/DeskCard.tsx';
import { List, ListItem } from '@mui/material';


export interface DeskListProps {
  locationId: string;
  searchValue: string;
}

export const DeskList = (props: DeskListProps) => {

  // console.log('DeskList is rendering...');

  const [desks, setDesks] = useState<Desk[]>([]);

  const selectedDate = "2024-08-13"
  useEffect(() => {
    getDesks({ locationId: props.locationId, searchTerm: props.searchValue })
      .then(desklist => {
        addAvailablility({ desklist, selectedDate })
        setDesks(desklist)
      })

  }, [props.locationId, props.searchValue]);

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
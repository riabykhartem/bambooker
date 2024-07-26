import { useEffect, useState } from 'react';
import { getDesks } from '../../api/api';
import { Desk } from '../../api/desk.model';
import { MainLayout } from '../../layouts/MainLayout.tsx';
import { DeskCard } from '../DeskCard/DeskCard.tsx';
import { List, ListItem } from '@mui/material';


export interface DeskListProps {
  locationId: string;
  searchValue: string;
}

export const DeskList = (props: DeskListProps) => {

  console.log('DeskList is rendering...');

  const [desks, setDesks] = useState<Desk[]>([]);


  useEffect(() => {
    getDesks({ locationId: props.locationId, searchTerm: props.searchValue })
      .then(results => {
        setDesks(results);
      });

  }, [props.locationId, props.searchValue]);

  return (
    <MainLayout>
      <List sx={{
        mt: "50px",
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: "70vh",
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
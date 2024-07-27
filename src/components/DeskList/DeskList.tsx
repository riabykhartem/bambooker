import { Desk } from '../../api/desk.model';
import { MainLayout } from '../../layouts/MainLayout.tsx';
import { DeskCard } from '../DeskCard/DeskCard.tsx';
import { List, ListItem } from '@mui/material';

export interface DeskListProps {
  locationId: string;
  desks: Desk[];
}

export const DeskList = (props: DeskListProps) => {
  console.log('DeskList is rendering...');

  return (
    <MainLayout>
      <List sx={{
        width: '360px'
      }}>
        {props.desks.map((desk) => (
          <ListItem key={desk.id}>
            <DeskCard {...desk} />
          </ListItem>
        ))}
      </List>
    </MainLayout>
  )
}
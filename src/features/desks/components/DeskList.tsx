/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from 'react';
import { getDesks } from '../api/desksApi.tsx';
import { Desk, DeskFeature } from '../../../models/desk.model.ts';
import { DeskCard } from './DeskCard.tsx';
import { Button, List, ListItem } from '@mui/material';
import { Dayjs } from 'dayjs';
import { ReservationDialog } from './ReservationDialog.tsx';

export interface DeskListProps {
  locationId: string;
  searchValue: string;
  selectedDate: Dayjs | null;
}

export const DeskList = (props: DeskListProps) => {
  const [desks, setDesks] = useState<Desk[]>([]);
  const [selectedDesk, setSelectedDesk] = useState<string | null>(null);
  const [selectedDeskName, setSelectedDeskName] = useState<string | null>(null);
  const [selectedDeskFeatures, setSelectedDeskFeatures] = useState<DeskFeature[] | null>(null);
  const elementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log('desklist rerendered');
    getDesks({
      locationId: props.locationId,
      searchTerm: props.searchValue,
      selectedDate: props.selectedDate ?? undefined,
    }).then((desklist) => {
      setDesks(desklist);
    });
  }, [props.locationId, props.searchValue, props.selectedDate]);

  const OnReserve = (deskId: string, deskName: string, deskFeatures: DeskFeature[]) => {
    setSelectedDesk(deskId);
    setSelectedDeskName(deskName);
    setSelectedDeskFeatures(deskFeatures);
  };

  const onClose = () => {
    setSelectedDesk(null);
    elementRef.current?.focus();
  };

  return (
    <>
      <Button ref={elementRef}>example</Button>
      <List
        sx={{
          width: '360px',
        }}
      >
        {desks.map((desk) => (
          <ListItem key={desk.id}>
            <DeskCard {...desk} OnReserve={() => OnReserve(desk.id, desk.name, desk.features)} />
          </ListItem>
        ))}
      </List>

      {props.selectedDate && selectedDesk && selectedDeskName && selectedDeskFeatures && (
        <ReservationDialog
          dialogIsOpen={!!selectedDesk}
          onClose={onClose}
          selectedDate={props.selectedDate}
          deskId={selectedDesk}
          deskName={selectedDeskName}
          deskFeatures={selectedDeskFeatures}
        />
      )}
    </>
  );
};

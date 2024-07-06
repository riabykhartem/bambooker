import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { getDesks, getLocations } from '../../api/api';
import { Desk } from '../../api/desk.model';
import { Location } from '../../api/location.model.ts';
import { MainLayout } from '../../layouts/MainLayout.tsx';
import { DeskCard } from '../DeskCard/DeskCard.tsx';
import { List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface DeskListProps {
  locationId: string;
}

export const DeskList = (props: DeskListProps) => {

  console.log('DeskList is rendering...');

  const [desks, setDesks] = useState<Desk[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    getDesks({locationId: props.locationId})
      .then(results => {
        setDesks(results);
      });

    getLocations()
      .then(locations => {
        setLocations(locations);
      });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const q = searchInputRef.current?.value ?? '';

    getDesks({locationId: props.locationId, searchTerm: q})
      .then(results => {
        setDesks(results);
      });
  }

  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    navigate(`/${e.target.value}/desks`);
  }

  return (
    <MainLayout>
      <select value={props.locationId} onChange={handleLocationChange}>
        {locations.map(location => (
          <option key={location.id} value={location.id}>{location.displayName}</option>
        ))}
      </select>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search for desk" ref={searchInputRef} />
        <button type="submit">Search</button>
      </form>
      <List>
        {desks.map((desk) => (
          <ListItem key={desk.id}>
            <DeskCard {...desk} />
          </ListItem>
        ))}
      </List>
    </MainLayout>
  )
}
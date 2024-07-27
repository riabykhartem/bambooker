import { DeskList } from '../components/DeskList/DeskList.tsx';
import { useParams } from 'react-router-dom';
import { DeskListToolbar } from '../components/DeskListToolbar/DeskListToolbar.tsx'
import { useState } from 'react';
import { AppBar, Toolbar } from "@mui/material";
import { Desk } from "../api/desk.model.ts";
import { getDesks } from "../api/api.ts";

export const DesksPage = () => {
  console.log('DesksPage is rendering');

  const [desks, setDesks] = useState<Desk[]>([]);
  const { locationId } = useParams();

  if (!locationId)
    throw new Error('locationId param is missing');

  const handleSearch = (searchTerm?: string, date?: Date) => {
    getDesks({ locationId: locationId, searchTerm: searchTerm, date })
      .then(results => {
        setDesks(results);
      });
  };

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <DeskListToolbar locationId={locationId} handleSearch={handleSearch}/>
      </AppBar>
      <Toolbar/>
      <DeskList key={locationId} locationId={locationId} desks={desks}/>
    </>
  )
}
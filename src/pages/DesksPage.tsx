import { DeskList } from '../components/DeskList/DeskList.tsx';
import { useParams } from 'react-router-dom';
import { DeskListToolbar } from '../components/DeskListToolbar/DeskListToolbar.tsx'
import { useState } from 'react';
import { AppBar } from "@mui/material";


export const DesksPage = () => {
  const { locationId } = useParams()
  console.log(locationId);

  const [searchValue, setSearchValue] = useState('')
  if (!locationId)
    throw new Error('locationId param is missing');

  const handleSearch = (value: string) => {
    setSearchValue(value)

  }
  return (
    <>
      <AppBar position="fixed" color="inherit">
        <DeskListToolbar locationId={locationId} handleSearch={handleSearch} />
      </AppBar>
      <DeskList key={locationId} locationId={locationId} searchValue={searchValue} />
    </>
  )
}
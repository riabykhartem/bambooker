import { DeskList } from '../components/DeskList/DeskList.tsx';
import { useParams } from 'react-router-dom';
import { DeskListToolbar } from '../components/DeskListToolbar/DeskListToolbar.tsx'
import { useState } from 'react';
import { AppBar } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';


export const DesksPage = () => {
  const { locationId } = useParams()
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())
  const [searchValue, setSearchValue] = useState('')
  if (!locationId)
    throw new Error('locationId param is missing');

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }
  return (
    <>
      <AppBar position="fixed" color="inherit">
        <DeskListToolbar locationId={locationId} handleSearch={handleSearch} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </AppBar>
      <DeskList key={locationId} locationId={locationId} searchValue={searchValue} selectedDate={selectedDate} />
    </>
  )
}
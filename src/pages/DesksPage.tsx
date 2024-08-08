import { DeskList } from '../components/DeskList/DeskList.tsx';
import { useParams } from 'react-router-dom';
import { DeskListToolbar } from '../components/DeskListToolbar/DeskListToolbar.tsx'
import { useState } from 'react';
import { AppBar } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';


export const DesksPage = () => {
  const today = dayjs(new Date())
  const [searchValue, setSearchValue] = useState('')
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(today)
  const handleDateChange = (e: any) => {
    setSelectedDate(e)
  }

  const { locationId } = useParams();
  if (!locationId)
    throw new Error('locationId param is missing');

  const handleSearch = (value: string) => {
    setSearchValue(value)

  }
  return (
    <>
      <AppBar position="fixed" color="inherit">
        <DeskListToolbar locationId={locationId} handleDateChange={handleDateChange} handleSearch={handleSearch} selectedDate={selectedDate} />
      </AppBar>
      <DeskList key={locationId} locationId={locationId} searchValue={searchValue} />
    </>
  )
}
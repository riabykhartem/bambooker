import { DeskList } from '../features/desks/components/DeskList.tsx';
import { useParams } from 'react-router-dom';
import { DeskListToolbar } from '../features/desks/components/DeskListToolbar.tsx';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';


export const DesksPage = () => {
  const { locationId } = useParams();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [searchValue, setSearchValue] = useState('');
  if (!locationId)
    throw new Error("locationId param is missing");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  return (
    <>
      <DeskListToolbar locationId={locationId} handleSearch={handleSearch} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <DeskList key={locationId} locationId={locationId} searchValue={searchValue} selectedDate={selectedDate} />
    </>
  );
};
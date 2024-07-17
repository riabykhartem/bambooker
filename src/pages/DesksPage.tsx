import { DeskList } from '../components/DeskList/DeskList.tsx';
import { useParams } from 'react-router-dom';
import {DeskSearch} from '../components/DeskSearch/DeskSearch.tsx'
import { ChangeEvent, useState, useEffect } from 'react';
// import { getDesks } from '../api/api.ts';
// import { Desk } from '../api/desk.model';


export const DesksPage = () => {
  console.log("is rendering");
  const [searchValue, setSearchValue] = useState('')

  const {locationId} = useParams();
  if (!locationId)
    throw new Error('locationId param is missing');

  const handleSearch = (value: string) =>{
    setSearchValue(value)

  }
  return (
    <>
    <DeskSearch locationId={locationId} handleSearch={handleSearch}/>
    <DeskList key={locationId} locationId={locationId} searchValue={searchValue}/>
    </>
  )
}
import { ChangeEvent, useEffect, useState } from "react"
import { getLocations } from "../../api/api"
import { Location } from '../../api/location.model.ts';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from "../../assets/hooks/useDebounce.tsx";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';





export interface DeskSearchProps {
  handleSearch: (value: string) => void
  locationId: string
}

export const DeskSearch = (props: DeskSearchProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [locations, setLocations] = useState<Location[]>([]);

  const debouncedSearch = useDebounce(searchValue)

  const navigate = useNavigate();

  useEffect(() => {
    props.handleSearch(debouncedSearch)
    getLocations()
      .then(locations => {
        setLocations(locations);
      });

  }, [debouncedSearch])

  const handleLocationChange = (e: SelectChangeEvent) => {
    navigate(`/${e.target.value}/desks`);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const q = e?.target?.value ?? '';
    setSearchValue(q);
    // props.handleSearch(debouncedSearch);
  }

  return (
    <>
      <Select sx={{ width: "500px" }} value={props.locationId} onChange={handleLocationChange}>
        {locations.map(location => (
          <MenuItem key={location.id} value={location.id}>{location.displayName}</MenuItem>
        ))}
      </Select  >
      <TextField sx={{ ml: "10px" }} onChange={handleInputChange} placeholder="Search for desk" />
    </>
  )
}
import { ChangeEvent, useEffect, useState } from "react"
import { getLocations } from "../../api/api"
import { Location } from '../../api/location.model.ts';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from "../../assets/hooks/useDebounce.tsx";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { styled, Toolbar } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';


const ToolbarStyled = styled(Toolbar)`
    gap: ${({ theme }) => theme.spacing(1)};
    justify-content: space-between;
`;

export interface DeskListToolbarProps {
  handleSearch: (value: string) => void
  locationId: string
}

export const DeskListToolbar = (props: DeskListToolbarProps) => {
  console.log(props.locationId);
  // console.log("DeskListToolbar is rendering");
  const today = dayjs()
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(today)
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
  }

  const handleDateChange = (e: Dayjs | null) => {
    if (e) {
      const formattedDate = e.format('MM-DD-YYYY');
      console.log(props.locationId);
      console.log(formattedDate);
      setSelectedDate(e)
      // navigate(`/${props.locationId}&${formattedDate}/desks`);
    }
  };


  return (
    <ToolbarStyled>
      <Select sx={{ width: '300px' }} size="small" value={props.locationId} onChange={handleLocationChange}>
        {locations.map(location => (
          <MenuItem key={location.id} value={location.id}>{location.displayName}</MenuItem>
        ))}
      </Select>
      <DatePicker disablePast={true} label="Date" value={selectedDate || null}
        onChange={handleDateChange}
      />
      <TextField size="small" onChange={handleInputChange} placeholder="Search for desk" />
    </ToolbarStyled>
  )
}
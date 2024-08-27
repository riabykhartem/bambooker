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
import { Dayjs } from 'dayjs';


const ToolbarStyled = styled(Toolbar)`
    gap: ${({ theme }) => theme.spacing(1)};
    justify-content: space-between;
`;

export interface DeskListToolbarProps {
  handleSearch: (value: string) => void
  locationId: string
  selectedDate: Dayjs | null
  setSelectedDate: (value: Dayjs | null) => void
}

export const DeskListToolbar = (props: DeskListToolbarProps) => {
  // console.log("DeskListToolbar is rendering");
  const [searchValue, setSearchValue] = useState('')
  const [locations, setLocations] = useState<Location[]>([]);
  const loadingValue = ''

  const debouncedSearch = useDebounce(searchValue);

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



  return (
    <ToolbarStyled>
      <Select sx={{ width: '300px' }} size="small" value={locations.length > 0 ? props.locationId : loadingValue} onChange={handleLocationChange}>
        {locations.map(location => (
          <MenuItem key={location.id} value={location.id}>{location.displayName}</MenuItem>
        ))}
      </Select>
      <DatePicker disablePast={true} label="Date" value={props.selectedDate}
        onChange={e => props.setSelectedDate(e)} slotProps={{
          textField: {
            size: "small"
          }
        }}
      />
      <TextField size="small" onChange={handleInputChange} placeholder="Search for desk" />
    </ToolbarStyled>
  )
}
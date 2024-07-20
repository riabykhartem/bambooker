import { ChangeEvent, useEffect, useState } from "react"
import { getLocations } from "../../api/api"
import { Location } from '../../api/location.model.ts';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from "../../assets/hooks/useDebounce.tsx";



export interface DeskSearchProps  {
    handleSearch: (value: string) => void
    locationId: string
  }

export const DeskSearch = (props: DeskSearchProps) =>{
    const [searchValue, setSearchValue] = useState('')
    const [locations, setLocations] = useState<Location[]>([]);

    const debouncedSearch = useDebounce(searchValue)

    const navigate = useNavigate();

    useEffect(()=>{
        props.handleSearch(debouncedSearch)
        getLocations()
        .then(locations => {
          setLocations(locations);
        });

      }, [debouncedSearch])

    const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
        navigate(`/${e.target.value}/desks`);
      }
    
    const  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const q = e?.target?.value ?? '';
        setSearchValue(q);
        // props.handleSearch(debouncedSearch);
    }
    
    return(
        <>
         <select value={props.locationId} onChange={handleLocationChange}>
        {locations.map(location => (
          <option key={location.id} value={location.id}>{location.displayName}</option>
        ))}
      </select> 
        <input type="text" onChange={handleInputChange} placeholder="Search for desk" />
      </>
    )
}
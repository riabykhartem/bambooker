import { FormEvent, useEffect, useRef, useState } from 'react';
import { getDesks } from '../../api/api.ts';
import { Desk } from '../../api/desk.model.ts';
import { useDebounce } from '../../assets/hooks/useDebounce.tsx';

export const DeskList = () => {
  const [search, setSearch] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useDebounce(search)

  console.log('DeskList is rendering...');

  const [desks, setDesks] = useState<Desk[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);


  useEffect(() => {
    console.log('another rendering');
      getDesks({query: debouncedSearch})
      .then(res =>  setDesks(res)
    )
  
  }, [debouncedSearch])

  const handleChange = async (e: FormEvent<HTMLInputElement>) =>{
    setSearch((e.target as HTMLInputElement).value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const q = searchInputRef.current?.value ?? '';

    getDesks({locationId: props.locationId, searchTerm: q})
      .then(results => {
        setDesks(results);
      });
  }

  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    navigate(`/${e.target.value}/desks`);
  }

  return (
    <MainLayout>
      <select value={props.locationId} onChange={handleLocationChange}>
        {locations.map(location => (
          <option key={location.id} value={location.id}>{location.displayName}</option>
        ))}
      </select>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" placeholder="Search for desk" ref={searchInputRef} />
        <button type="submit">Search</button>
      </form>
      <List>
        {desks.map((desk) => (
          <ListItem key={desk.id}>
            <DeskCard {...desk} />
          </ListItem>
        ))}
      </List>
    </MainLayout>
  )
}
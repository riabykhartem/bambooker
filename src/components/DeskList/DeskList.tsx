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

    getDesks({query: q})
      .then(results => {
        setDesks(results);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" placeholder="Search for desk" ref={searchInputRef} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {desks.map((desk) => (
          <li key={desk.id}>{desk.name}</li>
        ))}
      </ul>
    </>
  )
}
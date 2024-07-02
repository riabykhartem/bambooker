import { FormEvent, useEffect, useRef, useState } from 'react';
import { getDesks } from '../../api/api.ts';
import { Desk } from '../../api/desk.model.ts';

export const DeskList = () => {

  console.log('DeskList is rendering...');

  const [desks, setDesks] = useState<Desk[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getDesks({query: ''})
      .then(results => {
        setDesks(results);
      })
  }, []);

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
        <input type="text" placeholder="Search for desk" ref={searchInputRef} />
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
import { DeskList } from '../components/DeskList/DeskList.tsx';
import { useParams } from 'react-router-dom';

export const DesksPage = () => {
  const {locationId} = useParams();
  if (!locationId)
    throw new Error('locationId param is missing');

  return (
    <DeskList locationId={locationId} />
  );
}
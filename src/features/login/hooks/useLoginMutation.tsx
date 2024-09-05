import { login } from '../api/loginApi';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';



export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    mutationKey: ['login'],
    onSuccess: () => {
      navigate('/c80ae63/desks');
    },
    onError: error => {
      console.error('login error', error); // <- stay
    },
  });
}
import { useRef, FormEvent } from 'react';
import { login } from '../../api/api.ts';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Card, FormControl, Input, InputLabel, styled } from '@mui/material';

const CardStyled = styled(Card)`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    padding: ${({ theme }) => theme.spacing(4)};
`;

const FormStyled = styled('form')`
    width: 15rem;

    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.spacing(4)};
`;

export const LoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: ['login'],
    onSuccess: () => {
      navigate('/c80ae63/desks');
    },
    onError: error => {
      console.error('login error', error); // <- stay
    },
  });

  console.log('Login Form is rendering...');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const username = usernameRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';

    console.log('username and password', username, password);

    loginMutation.mutate({ username, password });
  }

  return (
    <CardStyled>
      <FormStyled onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="username-input">Username</InputLabel>
          <Input id="username-input" inputRef={usernameRef} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <Input id="password-input" inputRef={passwordRef} />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" disabled={loginMutation.isPending}>Login</Button>
      </FormStyled>
    </CardStyled>
  );
}

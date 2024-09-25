import { useRef, FormEvent } from 'react';
import { Button, Card, FormControl, Input, InputLabel, styled } from '@mui/material';
import { useLoginMutation } from '../hooks/useLoginMutation';

const FormStyled = styled('form')`
    width: 15rem;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(4)};

`;

const CardStyled = styled(Card)`
    padding: ${({ theme }) => theme.spacing(4)}
`;

export const LoginForm = () => {
  const loginMutation = useLoginMutation();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const username = usernameRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';

    console.log('username and password', username, password);

    loginMutation.mutate({ username, password });
  };

  return (
    <CardStyled>
      <FormStyled onSubmit={handleSubmit}>
        <FormControl variant="standard">
          <InputLabel htmlFor="username-input">Username</InputLabel>
          <Input id="username-input" inputRef={usernameRef} />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <Input id="password-input" inputRef={passwordRef} />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" disabled={loginMutation.isPending}>Login</Button>
      </FormStyled>
    </CardStyled>
  );
};

import { useRef, FormEvent } from 'react';
import { Button, Card, FormControl, Input, InputLabel, styled } from '@mui/material';
import { useLoginMutation } from '../hooks/useLoginMutation';
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
  const loginMutation = useLoginMutation()
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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

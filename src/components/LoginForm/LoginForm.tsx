import classes from './LoginForm.module.scss';
import { useRef, FormEvent } from 'react';
import { login } from '../../api/api.ts';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';


export const LoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // useQuery <-
  // useMutation <-

  // state: { login: ..., getSmth: ...}
  // App
  //  LoginPage
  //    LoginForm -> useMutation -> useContext(ReactQueryContext)

  // Redux Toolkit / RTK

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: ['login'],
    onSuccess: () => {
      navigate('/desks');
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

    loginMutation.mutate({username, password});
  }

  return (
    <form className={classes.loginForm} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={usernameRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <div>
        <button type="submit" disabled={loginMutation.isPending}>Login</button>
      </div>
    </form>
  );
}

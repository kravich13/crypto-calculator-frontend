import { v4 as uuid } from 'uuid';
import { LogInPage } from '../pages/logIn/LoginPage';
import { MainPage } from '../pages/main/MainPage';
import { SignUpPage } from '../pages/signUp/SignUpPage';

export const publicRoutes = [
  {
    path: '/',
    component: MainPage,
    title: 'Calculator | Crypto Calculator | Demo',
    id: uuid(),
  },
  {
    path: '/login',
    component: LogInPage,
    title: 'Calculator |  Log in',
    id: uuid(),
  },
  {
    path: '/sign-up',
    component: SignUpPage,
    title: 'Calculator | Sign up',
    id: uuid(),
  },
];

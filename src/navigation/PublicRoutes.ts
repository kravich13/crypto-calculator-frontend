import React from 'react';
import { v4 as uuid } from 'uuid';

export const publicRoutes = [
  {
    path: '/',
    component: React.lazy(async () => await import('../pages/main/MainPage')),
    title: 'Calculator | Crypto Calculator | Demo',
    id: uuid(),
  },
  {
    path: '/login',
    component: React.lazy(async () => await import('../pages/logIn/LoginPage')),
    title: 'Calculator |  Log in',
    id: uuid(),
  },
  {
    path: '/sign-up',
    component: React.lazy(async () => await import('../pages/signUp/SignUpPage')),
    title: 'Calculator | Sign up',
    id: uuid(),
  },
  {
    path: '/password-recovery',
    component: React.lazy(
      async () => await import('../pages/passwordRecovery/PasswordRecoveryPage')
    ),
    title: 'Calculator | Password recovery',
    id: uuid(),
  },
];

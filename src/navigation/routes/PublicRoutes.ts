import React from 'react';
import { v4 as uuid } from 'uuid';
import { RoutesTypes } from '../types';

export const publicRoutes = [
  {
    path: RoutesTypes.LOGIN,
    component: React.lazy(async () => await import('../../pages/logIn/LoginPage')),
    title: 'Calculator |  Log in',
    id: uuid(),
  },
  {
    path: RoutesTypes.SIGN_UP,
    component: React.lazy(async () => await import('../../pages/signUp/SignUpPage')),
    title: 'Calculator | Sign up',
    id: uuid(),
  },
  {
    path: RoutesTypes.PASSWORD_RECOVERY,
    component: React.lazy(
      async () => await import('../../pages/passwordRecovery/PasswordRecoveryPage')
    ),
    title: 'Calculator | Password recovery',
    id: uuid(),
  },
];

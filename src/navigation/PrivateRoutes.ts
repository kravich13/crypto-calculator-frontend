import React from 'react';
import { v4 as uuid } from 'uuid';

export const privateRoutes = [
  {
    path: '/investment-cards',
    component: React.lazy(async () => await import('../pages/investmentCards/InvestmentCardsPage')),
    title: 'Calculator | Investment cards list',
    id: uuid(),
  },
];

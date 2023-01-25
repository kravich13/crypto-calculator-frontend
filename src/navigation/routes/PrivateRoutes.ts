import React from 'react';
import { v4 as uuid } from 'uuid';
import { RoutesTypes } from '../types';

export const privateRoutes = [
  {
    path: RoutesTypes.INVESTMENT_CARD,
    component: React.lazy(
      async () => await import('../../pages/investmentCards/InvestmentCardsPage')
    ),
    title: 'Calculator | Investment cards list',
    id: uuid(),
  },
  {
    path: RoutesTypes.CALCULATE_YIELD,
    component: React.lazy(
      async () => await import('../../pages/calculateYield/CalculateYieldPage')
    ),
    title: 'Calculator | Calculate monthly yield',
    id: uuid(),
  },
];

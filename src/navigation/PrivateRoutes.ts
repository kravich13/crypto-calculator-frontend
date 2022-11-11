import { v4 as uuid } from 'uuid';
import { InvestmentCardsPages } from '../pages/investmentCards/InvestmentCardsPage';

export const privateRoutes = [
  {
    path: '/investment-cards',
    component: InvestmentCardsPages,
    title: 'Calculator | Investment cards list',
    id: uuid(),
  },
];

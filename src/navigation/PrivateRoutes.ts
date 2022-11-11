import { v4 as uuid } from 'uuid';
import { InvestmentCardsPage } from '../pages/investmentCards/InvestmentCardsPage';

export const privateRoutes = [
  {
    path: '/investment-cards',
    component: InvestmentCardsPage,
    title: 'Calculator | Investment cards list',
    id: uuid(),
  },
];

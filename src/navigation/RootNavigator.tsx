import React, { useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { useAppSelector } from '../hooks';
import { NotFoundPage } from '../pages/notFound/NotFoundPage';
import { PageTitle } from './PageTitle';
import { privateRoutes } from './PrivateRoutes';
import { publicRoutes } from './PublicRoutes';

interface IRouterRenderInput {
  id: string;
  path: string;
  component: React.FC;
  title: string;
}

export const RootNavigator: React.FC = () => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const routerRender = useCallback(
    ({ id, path, component, title }: IRouterRenderInput) => (
      <Route key={id} path={path} element={<PageTitle Component={component} title={title} />} />
    ),
    []
  );

  return (
    <Router>
      <Header />

      <Routes>
        {isAuth ? privateRoutes.map(routerRender) : publicRoutes.map(routerRender)}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { Suspense, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { useAppSelector } from '../hooks';
import { PageTitle } from './PageTitle';
import { privateRoutes, publicRoutes } from './routes';
import { RoutesTypes } from './types';

interface IRouterRenderInput {
  id: string;
  path: string;
  component: React.FC;
  title: string;
}

const MainPage = React.lazy(async () => await import('../pages/main/MainPage'));
const NotFoundPage = React.lazy(async () => await import('../pages/notFound/NotFoundPage'));

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
      <Box component="section">
        <Header />

        <Suspense
          fallback={
            <Container sx={{ height: '100%', width: '100%' }}>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
              >
                <Typography variant="h6" fontWeight={600} mr={2}>
                  Page is loading...
                </Typography>
                <CircularProgress color="inherit" />
              </Backdrop>
            </Container>
          }
        >
          <Routes>
            {isAuth ? privateRoutes.map(routerRender) : publicRoutes.map(routerRender)}

            <Route
              path={RoutesTypes.MAIN}
              element={<PageTitle Component={MainPage} title="Calculator | Main" />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Box>
    </Router>
  );
};

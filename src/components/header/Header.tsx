import { AppBar, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AuthHeaderContent } from './AuthHeaderContent';
import { NotAuthHeaderContent } from './NotAuthHeaderContent';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const goToMain = useCallback(() => {
    if (pathname !== '/') {
      navigate('/');
    }
  }, [navigate, pathname]);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container component="div" maxWidth="xl" sx={{ flexGrow: 1 }}>
          <Typography
            component={'span'}
            variant={'h5'}
            sx={{ cursor: 'pointer' }}
            onClick={goToMain}
          >
            Crypto Calculator
          </Typography>
        </Container>

        {isAuth ? <AuthHeaderContent /> : <NotAuthHeaderContent />}
      </Toolbar>
    </AppBar>
  );
};

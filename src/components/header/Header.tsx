import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AuthHeaderContent } from './AuthHeaderContent';
import { NotAuthHeaderContent } from './NotAuthHeaderContent';

const useStyles = makeStyles({
  header: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  mobileHeader: {
    flex: 1,
    flexDirection: 'column',
  },
  mobileLogoContainer: {
    textAlign: 'center',
  },
});

export const Header: React.FC = () => {
  const classes = useStyles();
  const isMin500Width = useMediaQuery('(max-width:500px)');

  const tollbarClasses = [classes.header, isMin500Width && classes.mobileHeader];
  const logoClasses = [isMin500Width && classes.mobileLogoContainer];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const goToMain = useCallback(() => {
    if (pathname !== '/') {
      navigate('/');
    }
  }, [navigate, pathname]);

  return (
    <AppBar position="relative">
      <Toolbar className={tollbarClasses.join(' ')}>
        <Container
          component="div"
          maxWidth="xl"
          sx={{ flexGrow: 1 }}
          className={logoClasses.join(' ')}
        >
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

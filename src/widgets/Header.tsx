import { AuthHeaderContent, NotAuthHeaderContent } from '@cc/entities/Header';
import { useAppSelector } from '@cc/shared/lib';
import { RoutesTypes } from '@cc/shared/types';
import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

const useStyles = makeStyles(
  {
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
  },
  { name: 'MuiExamle_ComponentHeader' }
);

export const Header: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();
  const isMin500Width = useMediaQuery('(max-width:500px)');

  const tollbarClasses = [classes.header, isMin500Width && classes.mobileHeader];
  const logoClasses = [isMin500Width && classes.mobileLogoContainer];

  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const goToMain = useCallback(() => {
    if (router.pathname !== RoutesTypes.MAIN) {
      router.push(RoutesTypes.MAIN);
    }
  }, [router]);

  return (
    <AppBar position="sticky">
      <Toolbar className={tollbarClasses.join(' ')}>
        <Container component="div" maxWidth="xl" className={logoClasses.join(' ')}>
          <Typography component="span" variant="h5" sx={{ cursor: 'pointer' }} onClick={goToMain}>
            Crypto Calculator
          </Typography>
        </Container>

        {isAuth ? <AuthHeaderContent /> : <NotAuthHeaderContent />}
      </Toolbar>
    </AppBar>
  );
};

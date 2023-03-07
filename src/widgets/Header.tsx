import { AuthHeaderContent, NotAuthHeaderContent } from '@cc/entities/Header';
import { RoutesTypes } from '@cc/shared/enums';
import { authSlice, useAppDispatch, useAppSelector } from '@cc/shared/lib';
import { AppBar, Container, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import styles from './styles/Header.module.css';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMin500Width = useMediaQuery('(max-width:500px)');

  const { setAuth, setNotAuth } = authSlice.actions;
  const dispatch = useAppDispatch();

  const tollbarClasses = [styles.header, isMin500Width && styles.mobileHeader];
  const logoClasses = [isMin500Width && styles.mobileLogoContainer];

  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const goToMain = useCallback(() => {
    // if (pathname !== RoutesTypes.MAIN) {
    //   router.push(RoutesTypes.MAIN);

    // }
    dispatch(
      setAuth({
        accessToken: '',
        accessTokenExpiresIn: 0,
        refreshToken: '',
        refreshTokenExpiresIn: 0,
      })
    );
  }, [pathname]);

  return (
    <AppBar position="sticky">
      <Toolbar className={tollbarClasses.join(' ')}>
        <Container component="div" maxWidth="xl" className={logoClasses.join(' ')}>
          <Typography component="span" variant="h5" sx={{ cursor: 'pointer' }} onClick={goToMain}>
            Crypto Calculator
          </Typography>
        </Container>

        <NotAuthHeaderContent isLoadingContent={Boolean(isAuth === undefined)} />

        {/* {isAuth ? (
          <AuthHeaderContent />
        ) : (
          <NotAuthHeaderContent isLoadingContent={Boolean(isAuth === undefined)} />
        )} */}
      </Toolbar>
    </AppBar>
  );
};

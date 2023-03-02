import { AuthHeaderContent, NotAuthHeaderContent } from '@cc/entities/Header';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import { AppBar, Container, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import styles from './styles/Header.module.css';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMin500Width = useMediaQuery('(max-width:500px)');

  const tollbarClasses = [styles.header, isMin500Width && styles.mobileHeader];
  const logoClasses = [isMin500Width && styles.mobileLogoContainer];

  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const goToMain = useCallback(() => {
    if (pathname !== RoutesTypes.MAIN) {
      router.push(RoutesTypes.MAIN);
    }
  }, [pathname]);

  return (
    <AppBar position="sticky">
      <Toolbar className={tollbarClasses.join(' ')}>
        <Container component="div" maxWidth="xl" className={logoClasses.join(' ')}>
          <Typography component="span" variant="h5" sx={{ cursor: 'pointer' }} onClick={goToMain}>
            Crypto Calculator
          </Typography>
        </Container>

        {isAuth ? (
          <AuthHeaderContent />
        ) : (
          <NotAuthHeaderContent isLoadingContent={Boolean(isAuth === undefined)} />
        )}
      </Toolbar>
    </AppBar>
  );
};

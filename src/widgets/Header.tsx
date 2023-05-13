import { AuthHeaderContent, NotAuthHeaderContent } from '@cc/entities/Header/components';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import { AppBar, Container, Toolbar, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import CryptoMetricsFrame2 from '../../public/logo/crypto-metrics-frame-2.svg';
import styles from './styles/Header.module.css';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMin500Width = useMediaQuery('(max-width:500px)');

  const tollbarClasses = [styles.header, isMin500Width && styles.mobileHeader];
  const containerClasses = [isMin500Width ? styles.mobileLogoContainer : styles.contentContainer];

  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const goToMain = useCallback(() => {
    if (pathname !== RoutesTypes.MAIN) {
      router.push(RoutesTypes.MAIN);
    }
  }, [pathname]);

  return (
    <AppBar position="sticky">
      <Toolbar className={tollbarClasses.join(' ')}>
        <Container component="div" maxWidth="lg" className={containerClasses.join(' ')}>
          <Image
            alt="Crypto Metrics"
            src={CryptoMetricsFrame2}
            style={{ cursor: 'pointer' }}
            onClick={goToMain}
          />

          {isAuth ? (
            <AuthHeaderContent />
          ) : (
            <NotAuthHeaderContent isLoadingContent={Boolean(isAuth === undefined)} />
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

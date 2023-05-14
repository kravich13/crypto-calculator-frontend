import { AuthHeaderContent, NotAuthHeaderContent } from '@cc/entities/Header/components';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import { AppBar, Container, Toolbar } from '@mui/material';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import CryptoMetricsFrame2 from '../../public/logo/crypto-metrics-frame-2.svg';
import styles from './styles/Header.module.scss';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const goToMain = useCallback(() => {
    if (pathname !== RoutesTypes.MAIN) {
      router.push(RoutesTypes.MAIN);
    }
  }, [pathname]);

  return (
    <AppBar position="sticky">
      <Toolbar className={styles.header}>
        <Container component="div" maxWidth="lg" className={styles.container}>
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

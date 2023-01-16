import { Button, Container, useMediaQuery } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTypedNavigate } from '../../hooks';
import { RoutesTypes } from '../../navigation';

export const NotAuthHeaderContent: React.FC = () => {
  const isMin500Width = useMediaQuery('(max-width:500px)');

  const navigate = useTypedNavigate();
  const { pathname } = useLocation();

  const goToLogIn = useCallback(() => {
    navigate(RoutesTypes.LOGIN);
  }, [navigate]);

  const goToSignUp = useCallback(() => {
    navigate(RoutesTypes.SIGN_UP);
  }, [navigate]);

  const { isLoginOrRecoveryPage, isSignUpPage, isNotAuthPage } = useMemo(() => {
    const isLoginOrRecoveryPage = pathname === '/login' || pathname === '/password-recovery';
    const isSignUpPage = pathname === '/sign-up';

    return {
      isLoginOrRecoveryPage: isLoginOrRecoveryPage,
      isSignUpPage,
      isNotAuthPage: !isLoginOrRecoveryPage && !isSignUpPage,
    };
  }, [pathname]);

  return (
    <Container
      component="div"
      sx={[
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: isMin500Width ? 'center' : 'flex-end',
          paddingTop: isMin500Width ? 1 : 0,
        },
      ]}
    >
      {(isSignUpPage || isNotAuthPage) && (
        <Button
          sx={[{ textTransform: 'none' }, !isNotAuthPage && { width: '120px' }]}
          color="inherit"
          onClick={goToLogIn}
          variant={isSignUpPage ? 'outlined' : 'text'}
        >
          Log In
        </Button>
      )}

      {(isLoginOrRecoveryPage || isNotAuthPage) && (
        <Button
          sx={[{ textTransform: 'none', width: '120px' }, !isNotAuthPage && { width: '120px' }]}
          color={isLoginOrRecoveryPage ? 'primary' : 'inherit'}
          onClick={goToSignUp}
          variant={isLoginOrRecoveryPage ? 'contained' : 'text'}
        >
          Sign Up
        </Button>
      )}
    </Container>
  );
};

import { Button } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const NotAuthHeaderContent: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goToLogIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const goToSignUp = useCallback(() => {
    navigate('/sign-up');
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
    <>
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
    </>
  );
};

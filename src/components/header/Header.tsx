import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goToLogIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const goToSignUp = useCallback(() => {
    navigate('/sign-up');
  }, [navigate]);

  const goToMain = useCallback(() => {
    if (pathname !== '/') {
      navigate('/');
    }
  }, [navigate, pathname]);

  const { isAuthPage, isLoginPage, isSignUpPage } = useMemo(() => {
    const isLoginPage = pathname === '/login';
    const isSignUpPage = pathname === '/sign-up';

    return {
      isAuthPage: isLoginPage || isSignUpPage,
      isLoginPage,
      isSignUpPage,
    };
  }, [pathname]);

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Typography
              component={'span'}
              variant={'h5'}
              sx={{ cursor: 'pointer' }}
              onClick={goToMain}
            >
              Crypto Calculator
            </Typography>
          </Box>

          {(!isAuthPage || isSignUpPage) && (
            <Button
              sx={[{ textTransform: 'none' }, isAuthPage && { width: '120px' }]}
              color="inherit"
              onClick={goToLogIn}
              variant={isSignUpPage ? 'outlined' : 'text'}
            >
              Log In
            </Button>
          )}

          {(!isAuthPage || isLoginPage) && (
            <Button
              sx={[{ textTransform: 'none' }, isAuthPage && { width: '120px' }]}
              color={isLoginPage ? 'primary' : 'inherit'}
              onClick={goToSignUp}
              variant={isLoginPage ? 'contained' : 'text'}
            >
              Sign Up
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

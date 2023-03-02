import { RoutesTypes } from '@cc/shared/enums';
import { Button, Container, Skeleton, useMediaQuery } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

interface INotAuthHeaderContentProps {
  isLoadingContent: boolean;
}

export const NotAuthHeaderContent: React.FC<INotAuthHeaderContentProps> = ({
  isLoadingContent,
}) => {
  const isMin500Width = useMediaQuery('(max-width:500px)');

  const router = useRouter();
  const pathname = usePathname();

  const goToLogIn = useCallback(() => {
    router.push(RoutesTypes.LOGIN);
  }, [router]);

  const goToSignUp = useCallback(() => {
    router.push(RoutesTypes.SIGN_UP);
  }, [router]);

  const { isLoginOrRecoveryPage, isSignUpPage, isNotAuthPage } = useMemo(() => {
    const isLoginOrRecoveryPage =
      pathname === RoutesTypes.LOGIN || pathname === RoutesTypes.PASSWORD_RECOVERY;
    const isSignUpPage = pathname === RoutesTypes.SIGN_UP;

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
        <>
          {isLoadingContent ? (
            <Skeleton
              variant="text"
              width={120}
              height={40}
              sx={[isNotAuthPage && { marginRight: 2 }]}
            />
          ) : (
            <Button
              sx={[{ textTransform: 'none' }, !isNotAuthPage && { width: '120px' }]}
              color="inherit"
              onClick={goToLogIn}
              variant={isSignUpPage ? 'outlined' : 'text'}
            >
              Log In
            </Button>
          )}
        </>
      )}

      {(isLoginOrRecoveryPage || isNotAuthPage) && (
        <>
          {isLoadingContent ? (
            <Skeleton variant="text" width={120} height={40} />
          ) : (
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
      )}
    </Container>
  );
};

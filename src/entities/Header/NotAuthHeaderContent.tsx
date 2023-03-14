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
  const isMax500Width = useMediaQuery('(max-width:500px)');

  const router = useRouter();
  const pathname = usePathname();

  const goToLogIn = useCallback(() => {
    router.push(RoutesTypes.LOGIN);
  }, [router]);

  const { isNotAuthPage } = useMemo(() => {
    const isLoginPage = pathname === RoutesTypes.LOGIN;

    return { isNotAuthPage: !isLoginPage };
  }, [pathname]);

  return (
    <Container
      component="div"
      sx={[
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: isMax500Width ? 'center' : 'flex-end',
          paddingTop: isMax500Width ? 1 : 0,
        },
      ]}
    >
      {isNotAuthPage && (
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
              variant="outlined"
            >
              Log In
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

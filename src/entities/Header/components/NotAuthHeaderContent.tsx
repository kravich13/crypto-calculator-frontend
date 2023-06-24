import { RoutesTypes } from '@cc/shared/enums';
import { Box, Button, Skeleton } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import styles from '../styles/NoAuthHeaderContent.module.scss';
import { GeneralContent } from './GeneralContent';

interface INotAuthHeaderContentProps {
  isLoadingContent: boolean;
}

export const NotAuthHeaderContent: React.FC<INotAuthHeaderContentProps> = ({
  isLoadingContent,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const goToLogIn = useCallback(() => {
    router.push(RoutesTypes.LOGIN);
  }, [router]);

  const { isNotAuthPage, isConfirmEmailPage } = useMemo(() => {
    const isConfirmEmailPage = pathname?.includes(RoutesTypes.CONFIRM_EMAIL);
    const isLoginPage = pathname === RoutesTypes.LOGIN;

    return { isNotAuthPage: !isLoginPage, isConfirmEmailPage };
  }, [pathname]);

  return (
    <Box component="div" className={styles.container}>
      <Box style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {isNotAuthPage && !isConfirmEmailPage && (
          <>
            {isLoadingContent ? (
              <Skeleton variant="text" width={120} height={40} />
            ) : (
              <Button
                sx={[{ textTransform: 'none', width: '120px' }]}
                color="inherit"
                variant="outlined"
                onClick={goToLogIn}
              >
                Log In
              </Button>
            )}
          </>
        )}

        {!isLoadingContent && <GeneralContent />}
      </Box>
    </Box>
  );
};

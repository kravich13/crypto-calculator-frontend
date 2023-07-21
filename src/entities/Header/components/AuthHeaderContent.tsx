import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector, useAuthContext } from '@cc/shared/lib';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, Button, Fade, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import styles from '../styles/AuthHeaderContent.module.scss';
import { GeneralContent } from './GeneralContent';
import { Typography } from '@cc/shared/ui';

export const AuthHeaderContent: React.FC = () => {
  const emailUser = useAppSelector((state) => state.authReducer.email);
  const hasProfitData = useAppSelector((state) => state.profitReducer.hasData);

  const { logout } = useAuthContext();
  const { palette } = useTheme();
  const { t } = useTranslation();

  const router = useRouter();
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const showCalculationButton = Boolean(
    hasProfitData && pathname !== RoutesTypes.INVESTMENT_STATISTICS
  );

  const avatarTitle = emailUser.at(0)?.toUpperCase();
  const isOpen = Boolean(anchorEl);

  const onClickLastCalculation = useCallback(() => {
    router.push(RoutesTypes.INVESTMENT_STATISTICS);
  }, [router]);

  const onClickUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onLogout = useCallback(() => {
    handleClose();
    logout({ redirectTo: RoutesTypes.MAIN });
  }, []);

  const normalizeHash = useCallback(
    (hash: number, min: number, max: number) => Math.floor((hash % (max - min)) + min),
    []
  );

  const getHashOfString = useCallback((str: string) => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    hash = Math.abs(hash);

    return hash;
  }, []);

  const generateHSL = useCallback((name: string) => {
    const hRange = [0, 360];
    const sRange = [0, 100];
    const lRange = [0, 100];

    const hash = getHashOfString(name);

    return [
      normalizeHash(hash, hRange[0], hRange[1]),
      normalizeHash(hash, sRange[0], sRange[1]),
      normalizeHash(hash, lRange[0], lRange[1]),
    ];
  }, []);

  const HSLtoString = useCallback((hsl: number[]) => `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`, []);

  const colorByUser = useMemo(() => {
    const hsl = generateHSL(emailUser);

    return HSLtoString(hsl);
  }, [emailUser]);

  return (
    <Box className={styles.container}>
      {showCalculationButton && (
        <Button variant="text" color="inherit" onClick={onClickLastCalculation}>
          <Typography noWrap>{t('cc.entity.header.button.lastCalculation')}</Typography>
        </Button>
      )}

      <IconButton title={emailUser} onClick={onClickUserMenu}>
        <Avatar sx={{ width: 34, height: 34, backgroundColor: colorByUser }}>{avatarTitle}</Avatar>
      </IconButton>

      <GeneralContent />

      <Menu open={isOpen} anchorEl={anchorEl} TransitionComponent={Fade} onClose={handleClose}>
        <MenuItem onClick={onLogout}>
          <LogoutIcon style={{ color: 'red', marginRight: 4 }} />

          <Typography fontWeight="600" style={{ color: palette.error.dark }}>
            {t('cc.entity.header.button.logout')}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

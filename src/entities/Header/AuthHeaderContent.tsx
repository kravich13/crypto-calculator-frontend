import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector, useAuthContext } from '@cc/shared/lib';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, Button, Fade, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

export const AuthHeaderContent: React.FC = () => {
  const emailUser = useAppSelector((state) => state.userDataReducer.email);
  const hasProfitData = useAppSelector((state) => state.profitReducer.hasData);

  const { logout } = useAuthContext();

  const router = useRouter();
  const pathname = usePathname();

  const showCalculationButton = Boolean(
    hasProfitData && pathname !== RoutesTypes.INVESTMENT_STATISTICS
  );

  const avatarTitle = emailUser.at(0)?.toUpperCase();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  return (
    <Box>
      {showCalculationButton && (
        <Button variant="text" color="inherit" onClick={onClickLastCalculation}>
          Last calculation
        </Button>
      )}

      <IconButton title={emailUser} onClick={onClickUserMenu}>
        <Avatar sx={{ width: 34, height: 34 }}>{avatarTitle}</Avatar>
      </IconButton>

      <Menu open={isOpen} anchorEl={anchorEl} TransitionComponent={Fade} onClose={handleClose}>
        <MenuItem onClick={onLogout}>
          <LogoutIcon style={{ color: 'red', marginRight: 4 }} />

          <Typography color="red" fontWeight="600">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

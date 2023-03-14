import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector, useAuthContext } from '@cc/shared/lib';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, Fade, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

export const AuthHeaderContent: React.FC = () => {
  const emailUser = useAppSelector((state) => state.userDataReducer.email);
  const { logout } = useAuthContext();
  const router = useRouter();

  const avatarTitle = emailUser.at(0)?.toUpperCase();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onLogout = useCallback(() => {
    handleClose();
    logout({ redirectTo: RoutesTypes.MAIN });
  }, []);

  const onRecoveryPassword = useCallback(() => {
    handleClose();
    router.push(RoutesTypes.PASSWORD_RECOVERY);
  }, []);

  return (
    <Box>
      <IconButton title="Manage account" onClick={handleClick}>
        <Avatar sx={{ width: 34, height: 34 }}>{avatarTitle}</Avatar>
      </IconButton>

      <Menu open={isOpen} anchorEl={anchorEl} TransitionComponent={Fade} onClose={handleClose}>
        <MenuItem onClick={onRecoveryPassword}>Recovery password</MenuItem>

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

import { RoutesTypes, useAppSelector, useAuthContext } from '@cc/shared';
import { Avatar, Box, Fade, IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

export const AuthHeaderContent: React.FC = () => {
  const router = useRouter();
  const emailUser = useAppSelector((state) => state.userDataReducer.email);
  const { logout } = useAuthContext();

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
    setAnchorEl(null);
    router.push(RoutesTypes.MAIN);
    logout();
  }, [router]);

  return (
    <Box>
      <IconButton title="Manage account" onClick={handleClick}>
        <Avatar sx={{ width: 34, height: 34 }}>{avatarTitle}</Avatar>
      </IconButton>

      <Menu open={isOpen} anchorEl={anchorEl} TransitionComponent={Fade} onClose={handleClose}>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
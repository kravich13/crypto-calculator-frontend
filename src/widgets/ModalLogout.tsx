import { useAuthContext } from '@cc/shared/lib';
import { Box, Modal, SxProps, Typography } from '@mui/material';
import React from 'react';

const styles: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  background: 'white',
  p: 4,
  borderRadius: 3,
};

export const ModalLogout: React.FC = () => {
  const { showModalLogout } = useAuthContext();

  return (
    <Modal open={showModalLogout}>
      <Box sx={styles}>
        <Typography variant="h6" component="h2">
          Authorization timed out
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Within 5 seconds you will be redirected to the main page.
        </Typography>
      </Box>
    </Modal>
  );
};

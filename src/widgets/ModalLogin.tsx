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

export const ModalLogin: React.FC = () => {
  const { showModalLogin } = useAuthContext();

  return (
    <Modal open={showModalLogin}>
      <Box sx={styles}>
        <Typography variant="h6" component="h2" color="lightgreen" fontWeight="600">
          You have successfully logged in
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Within 3 seconds you will be redirected to the main page.
        </Typography>
      </Box>
    </Modal>
  );
};

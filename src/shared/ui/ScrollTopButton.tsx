import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Fab, Fade, useScrollTrigger } from '@mui/material';
import { memo, useCallback } from 'react';

export const ScrollTopButton = memo(() => {
  const trigger = useScrollTrigger({ disableHysteresis: true });

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}
      >
        <Fab size="medium" variant="circular" color="primary" style={{ border: '1px solid white' }}>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  );
});

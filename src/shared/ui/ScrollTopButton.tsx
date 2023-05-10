import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Fab, Fade, useScrollTrigger } from '@mui/material';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { GET_PRIMARY_COLOR } from '../const';

export const ScrollTopButton = memo(() => {
  const trigger = useScrollTrigger({ disableHysteresis: true });

  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef(trigger);

  const [isVisible, setIsVisible] = useState(false);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const checkScroll = useCallback(() => {
    if (triggerRef) {
      setIsVisible(true);

      clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1300);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    triggerRef.current = trigger;
  }, [trigger]);

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <Fade in={trigger && isVisible}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}
      >
        <Fab
          size="medium"
          variant="circular"
          style={{ border: '1px solid white', background: GET_PRIMARY_COLOR(0.83) }}
        >
          <KeyboardArrowUpIcon style={{ color: 'white' }} />
        </Fab>
      </Box>
    </Fade>
  );
});

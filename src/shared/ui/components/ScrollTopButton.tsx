import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Fab, Fade, useScrollTrigger, useTheme } from '@mui/material';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { GET_PRIMARY_LIGHT_COLOR } from '../../const';
import { useThemeContext } from '../../lib';
import variables from '../../styles/Variables.module.scss';

export const ScrollTopButton = memo(() => {
  const { themeMode } = useThemeContext();
  const { palette } = useTheme();
  const trigger = useScrollTrigger({ disableHysteresis: true });

  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef(trigger);

  const [isVisible, setIsVisible] = useState(false);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const checkScroll = useCallback(() => {
    if (triggerRef.current) {
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
          style={{
            border: `1px solid ${variables.logo}`,
            background:
              themeMode === 'light'
                ? GET_PRIMARY_LIGHT_COLOR(0.83)
                : palette.action.disabledBackground,
            boxShadow: 'initial',
          }}
        >
          <KeyboardArrowUpIcon style={{ color: variables.logo }} />
        </Fab>
      </Box>
    </Fade>
  );
});

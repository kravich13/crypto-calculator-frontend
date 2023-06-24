import { ThemeButton } from '@cc/shared/ui';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import Flags from 'country-flag-icons/react/3x2';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styles from '../styles/GeneralContent.module.scss';

export const GeneralContent = () => {
  const { locale, pathname, asPath, push, locales } = useRouter();

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      push(pathname, asPath, { locale: event.target.value });
    },
    [asPath, pathname]
  );

  const menuItemRender = useCallback((l: string, index: number) => {
    const locale = l.toUpperCase();
    const flag = locale === 'EN' ? 'US' : locale;

    const Flag = Flags[flag as keyof typeof Flags];

    return (
      <MenuItem value={l} key={`${locale}-${index}`}>
        <Box className={styles.menuItemContainer}>
          <Flag height={16} />

          <Typography>{locale}</Typography>
        </Box>
      </MenuItem>
    );
  }, []);

  return (
    <Box className={styles.container}>
      <FormControl variant="outlined">
        <Select
          value={locale}
          onChange={handleChange}
          style={{ color: 'whitesmoke' }}
          SelectDisplayProps={{ className: styles.select }}
        >
          {locales?.map(menuItemRender)}
        </Select>
      </FormControl>

      <ThemeButton />
    </Box>
  );
};

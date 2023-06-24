import { ThemeButton } from '@cc/shared/ui';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const GeneralContent = () => {
  const { locale, pathname, asPath, push } = useRouter();

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      push(pathname, asPath, { locale: event.target.value });
    },
    [asPath, pathname]
  );

  return (
    <Box display="flex" gap="8px">
      <FormControl size="small">
        <Select value={locale} onChange={handleChange} variant="standard">
          <MenuItem value="en">
            <Typography fontSize="14px">EN</Typography>
          </MenuItem>

          <MenuItem value="ua">
            <Typography fontSize="14px">UA</Typography>
          </MenuItem>
        </Select>
      </FormControl>

      <ThemeButton />
    </Box>
  );
};

import { ICON_COLOR, PRIMARY_COLOR } from '@cc/shared/const';
import { useThemeContext } from '@cc/shared/lib';
import ColorsStyles from '@cc/shared/styles/Colors.module.css';
import { GitHub, LinkedIn, Telegram } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import styles from './styles/Footer.module.css';

interface ILinkData {
  id: string;
  linkedin: string;
  github: string;
  telegram: string;
}

export const Footer = React.memo(() => {
  const { palette } = useTheme();
  const { themeMode } = useThemeContext();

  const headerColor = themeMode === 'light' ? 'white' : 'whitesmoke';

  const links: ILinkData[] = useMemo(
    () => [
      {
        id: uuid(),
        github: 'https://github.com/kravich13',
        linkedin: 'https://www.linkedin.com/in/vladyslav-onatskyi-564447211',
        telegram: 'https://telegram.me/kravich13',
      },
      {
        id: uuid(),
        github: 'https://github.com/mkbaranovskyi',
        linkedin: 'https://www.linkedin.com/in/maksym-baranovskyi-66b610172',
        telegram: 'https://telegram.me/mkbar',
      },
    ],
    []
  );

  const renderLink = useCallback(
    ({ id, linkedin, github, telegram }: ILinkData, position?: 'left' | 'right') => (
      <Box
        key={id}
        className={styles.rowContainer}
        style={{ justifyContent: position === 'right' ? 'right' : 'left' }}
      >
        <Link href={linkedin} target="_blank" className={styles.link}>
          <LinkedIn className={styles.buttonLink} style={{ color: 'whitesmoke' }} />
        </Link>

        <Link href={github} target="_blank" className={styles.link} style={{ margin: '0 5px' }}>
          <GitHub className={styles.buttonLink} style={{ color: 'whitesmoke' }} />
        </Link>

        <Link href={telegram} target="_blank" className={styles.link}>
          <Telegram className={styles.buttonLink} style={{ color: 'whitesmoke' }} />
        </Link>
      </Box>
    ),
    []
  );

  return (
    <Box
      component="footer"
      sx={{
        background: themeMode === 'light' ? PRIMARY_COLOR : palette.background.default,
        paddingTop: '10px',
        paddingBottom: '10px',
      }}
      className={themeMode === 'dark' ? ColorsStyles.headerOrFooterBGImage : ''}
    >
      <Box className={styles.mainContainer}>
        <Box className={styles.mobileLogo}>
          <Typography variant="h6" component="p" fontWeight="600" style={{ color: ICON_COLOR }}>
            Crypto Metrics
          </Typography>
        </Box>

        <Box className={styles.contentContainer}>
          <Box className={styles.columnContainer}>
            <Typography
              className={styles.rowHeader}
              style={{
                textAlign: 'left',
                color: headerColor,
              }}
            >
              Idea and development
            </Typography>

            <Box className={styles.rowContainer} style={{ justifyContent: 'left' }}>
              <Typography style={{ color: ICON_COLOR }}>Vladislav Onatskyi</Typography>
            </Box>

            {renderLink(links[0])}
          </Box>

          <Box className={styles.columnContainer}>
            <Typography
              className={styles.rowHeader}
              style={{ textAlign: 'right', color: headerColor }}
            >
              Consulting
            </Typography>

            <Box className={styles.rowContainer} style={{ justifyContent: 'right' }}>
              <Typography style={{ color: ICON_COLOR }}>Maksym Baranovskyi</Typography>
            </Box>

            {renderLink(links[1], 'right')}
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

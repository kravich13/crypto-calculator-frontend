import { useThemeContext } from '@cc/shared/lib';
import sharedStyles from '@cc/shared/styles/Index.module.scss';
import colors from '@cc/shared/styles/Variables.module.scss';
import { GitHub, LinkedIn, Telegram } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import styles from './styles/Footer.module.scss';
import { useTranslation } from 'next-i18next';

interface ILinkData {
  id: string;
  linkedin: string;
  github: string;
  telegram: string;
}

export const Footer = React.memo(() => {
  const { palette } = useTheme();
  const { themeMode } = useThemeContext();
  const { t } = useTranslation();

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
        background: themeMode === 'light' ? colors.primaryLight : palette.background.default,
        paddingTop: '10px',
        paddingBottom: '10px',
      }}
      className={themeMode === 'dark' ? sharedStyles.headerOrFooterBGImage : ''}
    >
      <Box className={styles.mainContainer}>
        <Box className={styles.mobileLogo}>
          <Typography variant="h6" component="p" fontWeight="600" style={{ color: colors.logo }}>
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
              {t('cc.widget.footer.subtitle.ideaAndDev')}
            </Typography>

            <Box className={styles.rowContainer} style={{ justifyContent: 'left' }}>
              <Typography style={{ color: colors.logo }}>
                {t('cc.widget.footer.person.vlad')}
              </Typography>
            </Box>

            {renderLink(links[0])}
          </Box>

          <Box className={styles.columnContainer}>
            <Typography
              className={styles.rowHeader}
              style={{ textAlign: 'right', color: headerColor }}
            >
              {t('cc.widget.footer.subtitle.consulting')}
            </Typography>

            <Box className={styles.rowContainer} style={{ justifyContent: 'right' }}>
              <Typography style={{ color: colors.logo }}>
                {' '}
                {t('cc.widget.footer.person.max')}
              </Typography>
            </Box>

            {renderLink(links[1], 'right')}
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

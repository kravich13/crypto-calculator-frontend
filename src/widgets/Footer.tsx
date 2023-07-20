import { IPersonalInfo, PersonalInfo } from '@cc/entities/Footer';
import { useThemeContext } from '@cc/shared/lib';
import sharedStyles from '@cc/shared/styles/Index.module.scss';
import colors from '@cc/shared/styles/Variables.module.scss';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import styles from './styles/Footer.module.scss';

interface IPersonsInfo {
  vlad: IPersonalInfo;
  max: IPersonalInfo;
  evhen: IPersonalInfo;
}

export const Footer = React.memo(() => {
  const { palette } = useTheme();
  const { themeMode } = useThemeContext();
  const { t } = useTranslation();

  const headerColor = themeMode === 'light' ? 'white' : 'whitesmoke';

  const footerClassname = [
    themeMode === 'dark' ? sharedStyles.headerOrFooterBGImage : '',
    styles.footer,
  ];

  const personsInfo: IPersonsInfo = useMemo(
    () => ({
      vlad: {
        id: uuid(),
        titleName: t('cc.widget.footer.person.vlad'),
        github: 'https://github.com/kravich13',
        linkedin: 'https://www.linkedin.com/in/vladyslav-onatskyi-564447211',
        telegram: 'https://telegram.me/kravich13',
      },
      max: {
        id: uuid(),
        titleName: t('cc.widget.footer.person.max'),
        github: 'https://github.com/mkbaranovskyi',
        linkedin: 'https://www.linkedin.com/in/maksym-baranovskyi-66b610172',
        telegram: 'https://telegram.me/mkbar',
      },
      evhen: {
        id: uuid(),
        titleName: t('cc.widget.footer.person.evhen'),
        github: 'https://github.com/EvgenStr',
        linkedin: 'https://www.linkedin.com/in/yevhen-s-a13224222',
        telegram: 'https://t.me/yevhen_str',
      },
    }),
    [t]
  );

  return (
    <Box
      width="100%"
      component="footer"
      className={footerClassname.join(' ')}
      sx={{
        background: themeMode === 'light' ? colors.primaryLight : palette.background.default,
      }}
    >
      <Container maxWidth="lg" className={styles.mainContainer}>
        <Box className={styles.mobileLogo}>
          <Typography variant="h6" component="p" fontWeight="600" style={{ color: colors.logo }}>
            Crypto Metrics
          </Typography>
        </Box>

        <Box className={styles.contentContainer}>
          <Box className={styles.columnContainer}>
            <Typography
              className={styles.rowHeader}
              style={{ textAlign: 'left', color: headerColor }}
            >
              {t('cc.widget.footer.subtitle.idea')}
            </Typography>

            <Box>
              <PersonalInfo personInfo={personsInfo['vlad']} showLinks={false} />
            </Box>
          </Box>

          <Box className={styles.columnContainer}>
            <Typography
              className={styles.rowHeader}
              style={{ textAlign: 'left', color: headerColor }}
            >
              {t('cc.widget.footer.subtitle.dev')}
            </Typography>

            <Box className={styles.personsContainer}>
              <PersonalInfo personInfo={personsInfo['vlad']} />
              <PersonalInfo personInfo={personsInfo['evhen']} />
            </Box>
          </Box>

          <Box className={styles.columnContainer}>
            <Typography
              className={styles.rowHeader}
              style={{ textAlign: 'left', color: headerColor }}
            >
              {t('cc.widget.footer.subtitle.consulting')}
            </Typography>

            <Box>
              <PersonalInfo personInfo={personsInfo['max']} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

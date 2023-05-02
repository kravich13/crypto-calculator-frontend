import { PRIMARY_COLOR } from '@cc/shared/const';
import { GitHub, LinkedIn, Telegram } from '@mui/icons-material';
import { Box, Container, Typography, useMediaQuery } from '@mui/material';
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
  const isMax490Width = useMediaQuery('(max-width:490px)');

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
          <LinkedIn className={styles.buttonLink} />
        </Link>

        <Link href={github} target="_blank" className={styles.link} style={{ margin: '0 5px' }}>
          <GitHub className={styles.buttonLink} />
        </Link>

        <Link href={telegram} target="_blank" className={styles.link}>
          <Telegram className={styles.buttonLink} />
        </Link>
      </Box>
    ),
    []
  );

  return (
    <Box
      component="footer"
      sx={{ background: PRIMARY_COLOR, paddingTop: '10px', paddingBottom: '10px' }}
    >
      <Box className={isMax490Width ? styles.mobileContainer : styles.mainContainer}>
        <Box className={isMax490Width ? styles.mobileLogo : ''}>
          <Typography color="white" variant="h6" component="p">
            Crypto Metrics
          </Typography>
        </Box>

        <Box className={styles.contentContainer}>
          <Box className={styles.columnContainer}>
            <Typography className={styles.rowHeader} style={{ textAlign: 'left' }}>
              Idea and development
            </Typography>

            <Box className={styles.rowContainer} style={{ justifyContent: 'left' }}>
              <Typography style={{ color: '#EAFCB6' }}>Vladislav Onatskyi</Typography>
            </Box>

            {renderLink(links[0])}
          </Box>

          <Box className={styles.columnContainer}>
            <Typography className={styles.rowHeader} style={{ textAlign: 'right' }}>
              Consulting
            </Typography>

            <Box className={styles.rowContainer} style={{ justifyContent: 'right' }}>
              <Typography style={{ color: '#EAFCB6' }}>Maksym Baranovskyi</Typography>
            </Box>

            {renderLink(links[1], 'right')}
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

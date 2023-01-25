import { GitHub, LinkedIn, Telegram } from '@mui/icons-material';
import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles({
  Root: {
    background: '#1565c0',
    marginTop: 'auto',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mobileLogo: {
    marginBottom: 10,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnContainer: {
    width: 120,
  },
  rowContainer: {
    display: 'flex',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowHeader: {
    textAlign: 'center',
    paddingBottom: 5,
    color: 'white',
  },
  link: {
    all: 'unset',
    cursor: 'pointer',
    lineHeight: 0,
  },
  buttonLink: {
    height: 24,
    width: 24,
    borderRadius: 4,
    background: 'white',
  },
});

interface ILinkData {
  id: string;
  linkedin: string;
  github: string;
  telegram: string;
}

export const Footer: React.FC = () => {
  const styles = useStyles();
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
    ({ id, linkedin, github, telegram }: ILinkData) => (
      <Box key={id} className={styles.rowContainer}>
        <Link to={linkedin} target="_blank" className={styles.link}>
          <LinkedIn className={styles.buttonLink} />
        </Link>

        <Link to={github} target="_blank" className={styles.link} style={{ margin: '0 5px' }}>
          <GitHub className={styles.buttonLink} />
        </Link>

        <Link to={telegram} target="_blank" className={styles.link}>
          <Telegram className={styles.buttonLink} />
        </Link>
      </Box>
    ),
    []
  );

  return (
    <Container component="footer" maxWidth="xl" className={styles.Root}>
      <Box className={isMax490Width ? styles.mobileContainer : styles.mainContainer}>
        <Box className={isMax490Width ? styles.mobileLogo : ''}>
          <Typography color="white" variant="h6" component="p">
            Crypto Calculator
          </Typography>
        </Box>

        <Box className={styles.contentContainer}>
          <Box className={styles.columnContainer}>
            <Typography className={styles.rowHeader}>Developers</Typography>

            <Box className={styles.rowContainer}>
              <Typography color="Highlight">Frontend</Typography>
            </Box>

            <Box className={styles.rowContainer}>
              <Typography color="Highlight">Backend</Typography>
            </Box>
          </Box>

          <Box className={styles.columnContainer}>
            <Typography className={styles.rowHeader}>Contacts</Typography>

            {links.map(renderLink)}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

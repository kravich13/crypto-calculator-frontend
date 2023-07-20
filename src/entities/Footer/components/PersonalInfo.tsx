import { Typography } from '@cc/shared/ui';
import { GitHub, LinkedIn, Telegram } from '@mui/icons-material';
import { Box } from '@mui/material';
import Link from 'next/link';
import { useCallback } from 'react';
import { IPersonalInfo } from '../types';
import colors from '@cc/shared/styles/Variables.module.scss';
import styles from '../styles/PersonalInfo.module.scss';

type LinksKeysType = Pick<IPersonalInfo, Exclude<keyof IPersonalInfo, 'titleName'>>;

interface IPersonalInfoProps {
  personInfo: IPersonalInfo;
  showLinks?: boolean;
}

export const PersonalInfo: React.FC<IPersonalInfoProps> = ({ personInfo, showLinks = true }) => {
  const renderLinks = useCallback(
    ({ id, github, linkedin, telegram }: LinksKeysType) => (
      <Box key={id}>
        <Link
          href={linkedin}
          target="_blank"
          className={styles.link}
          style={{ textAlign: 'right' }}
        >
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
    <Box className={styles.rowContainer}>
      <Typography style={{ color: colors.logo }}>{personInfo.titleName}</Typography>

      {showLinks && renderLinks(personInfo)}
    </Box>
  );
};

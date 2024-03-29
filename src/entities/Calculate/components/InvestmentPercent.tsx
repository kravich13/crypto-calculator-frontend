import { Typography } from '@cc/shared/ui';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import React from 'react';
import styles from '../styles/InvestmentPercent.module.scss';

interface IInvestmentPercentProps {
  percent: number;
  textStyles?: React.CSSProperties;
}

export const InvestmentPercent: React.FC<IInvestmentPercentProps> = React.memo(
  ({ percent, textStyles }) => {
    const growth = Math.abs(percent);

    return (
      <Typography className={styles.percent} style={textStyles}>
        {percent >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
        {growth}%
      </Typography>
    );
  }
);

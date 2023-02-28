import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';

import styles from '../styles/InvestmentPercent.module.css';

interface IInvestmentPercentProps {
  percent: number;
  textStyles?: React.CSSProperties;
}

export const InvestmentPercent: React.FC<IInvestmentPercentProps> = ({ percent, textStyles }) => {
  const growth = Math.abs(percent);

  return (
    <Typography className={styles.percent} style={textStyles}>
      {percent >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
      {growth}%
    </Typography>
  );
};

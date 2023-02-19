import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(
  {
    percent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  { name: 'MuiExamle_ComponentInvestmentPercent' }
);

interface IInvestmentPercentProps {
  percent: number;
  textStyles?: React.CSSProperties;
}

export const InvestmentPercent: React.FC<IInvestmentPercentProps> = ({ percent, textStyles }) => {
  const styles = useStyles();

  return (
    <Typography className={styles.percent} style={textStyles}>
      {percent >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
      {percent}%
    </Typography>
  );
};

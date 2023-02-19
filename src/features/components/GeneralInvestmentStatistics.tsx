import { InvestmentPercent } from '@cc/entities/Calculate';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useMemo } from 'react';

const useStyles = makeStyles(
  {
    finalDataBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    percent: {
      marginLeft: '8px',
      padding: '0 6px',
      borderRadius: '8px',
    },
  },
  { name: 'MuiExamle_ComponentGeneralStatistics' }
);

export const GeneralInvestmentStatistics = () => {
  const styles = useStyles();

  const percent = 1300;
  const profit = 120000;

  const percentStyles = useMemo(
    () => ({
      marginLeft: '8px',
      paddingRight: '8px',
      paddingLeft: '2px',
      borderRadius: '8px',
      background: percent >= 0 ? '#16C784' : '#EA3943',
      color: 'white',
      fontWeight: 500,
    }),
    [percent]
  );

  const profitStyles = useMemo(
    () => ({
      color: profit >= 0 ? '#16C784' : '#EA3943',
      fontWeight: 600,
    }),
    [profit]
  );

  return (
    <>
      <Typography component="h1" variant="h5" textAlign="center" mb={3}>
        General statistics
      </Typography>

      <Box mb={2}>
        <Typography>Final balance</Typography>

        <Box className={styles.finalDataBox}>
          <Typography component="p" variant="h6">
            $130000
          </Typography>

          <InvestmentPercent percent={percent} textStyles={percentStyles} />
        </Box>
      </Box>

      <Box>
        <Typography>Invested</Typography>
        <Typography component="p" variant="h6">
          $10000
        </Typography>
        <Typography style={profitStyles}>+ ${profit}</Typography>
      </Box>
    </>
  );
};

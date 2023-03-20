import { Box, Typography } from '@mui/material';
import styles from '../styles/BaseDescription.module.css';

export const BaseDescription = () => {
  return (
    <Box className={styles.container}>
      <Box className={[styles.boxContent, styles.description].join(' ')}>
        <Typography>
          Imagine that you started investing $100 monthly in DogeCoin in 2019. By May 2021 your
          capital would have grown to 500k.
        </Typography>

        <br />

        <Typography>
          With our service, you can make your list of coins for investment and see how profitable
          this portfolio would be.
        </Typography>

        <br />

        <Typography>
          With this information, you can decide if you should invest in crypto in the future in the
          same way.
        </Typography>
      </Box>

      <Box className={styles.boxContent}>
        <Typography>Our tool will help you calculate:</Typography>

        <ul>
          <li>Profitability in $ and % for individual coins.</li>
          <li>Total profit in $ and %.</li>
          <li>Total capital.</li>
          <li>Starting, average and last price for each coin.</li>
        </ul>
      </Box>
    </Box>
  );
};

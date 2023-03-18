import { Box, Container, Typography } from '@mui/material';

export const BaseDescription = () => {
  return (
    <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography sx={{ width: '50%', mr: 10 }}>
        The program works with historical data on the exchange rates of cryptocurrencies and allows
        you to estimate how profitable your investments in cryptocurrencies would have been if you
        had made them in the past.
      </Typography>

      <Box style={{ width: '50%' }}>
        <Typography>After selecting the input options, you will learn:</Typography>

        <ul>
          <li>Profitability in $ and % for individual coins.</li>
          <li>Total profit in $ and %.</li>
          <li>Total capital.</li>
          <li>Starting, average and last price for each coin.</li>
        </ul>
      </Box>
    </Container>
  );
};

import { InvestmentPercent, MainCoinInfoContainer } from '@cc/entities/Calculate';
import { useAppSelector } from '@cc/shared/lib';
import { CalculateCoinProfitData } from '@cc/shared/types';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useCallback } from 'react';

export const DetailedInvestmentStatistics = () => {
  const coins = useAppSelector(({ profitReducer: { coins } }) => coins);

  const renderItem = useCallback(
    ({
      coinId,
      name,
      image,
      symbol,
      share,
      startingPrice,
      lastPrice,
      capital,
      purchasedCoins,
      invested,
      growth,
    }: CalculateCoinProfitData) => {
      const profit = Number((capital - invested).toFixed(2));
      const profitNumber = profit > 0 ? profit : Math.abs(profit);
      const profitTitle = `${profit >= 0 ? '+' : '-'} $${profitNumber}`;

      return (
        <React.Fragment key={coinId}>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              <MainCoinInfoContainer
                image={image}
                symbol={symbol}
                name={name}
                imageHeight={24}
                imageWidth={24}
              />
            </TableCell>

            <TableCell align="right">
              <Typography>{share}%</Typography>
            </TableCell>

            <TableCell align="right">
              <Typography>${startingPrice}</Typography>
            </TableCell>

            <TableCell align="right">
              <Typography>${lastPrice}</Typography>
            </TableCell>

            <TableCell align="right">
              <Box>
                <Typography>${capital}</Typography>

                <Typography color="GrayText" variant="body2" fontWeight="500">
                  {purchasedCoins} {symbol.toUpperCase()}
                </Typography>
              </Box>
            </TableCell>

            <TableCell align="right">
              <Box>
                <Typography>{profitTitle}</Typography>

                <InvestmentPercent
                  percent={growth}
                  textStyles={{
                    color: growth >= 0 ? '#16C784' : '#EA3943',
                    fontSize: 14,
                    justifyContent: 'end',
                    fontWeight: 600,
                  }}
                />
              </Box>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    },
    []
  );

  return (
    <>
      <Typography component="h1" variant="h5" textAlign="center" mb={3}>
        Detailed statistics
      </Typography>

      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="600">Name</Typography>
              </TableCell>

              <TableCell align="right">
                <Typography fontWeight="600">Share</Typography>
              </TableCell>

              <TableCell align="right">
                <Typography fontWeight="600">Starting price</Typography>
              </TableCell>

              <TableCell align="right">
                <Typography fontWeight="600">Last price</Typography>
              </TableCell>

              <TableCell align="right">
                <Typography fontWeight="600">Holdings</Typography>
              </TableCell>

              <TableCell align="right">
                <Typography fontWeight="600">Profit/Loss</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{coins.map(renderItem)}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

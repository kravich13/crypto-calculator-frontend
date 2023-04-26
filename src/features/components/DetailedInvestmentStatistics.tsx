import { InvestmentPercent, MainCoinInfoContainer } from '@cc/entities/Calculate';
import { LOSS_COLOR, PROFIT_COLOR } from '@cc/shared/const';
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
import { useCallback, useEffect, useMemo, useState } from 'react';

type ColumnNameType = Pick<
  CalculateCoinProfitData,
  'name' | 'share' | 'startingPrice' | 'averagePrice' | 'lastPrice' | 'capital' | 'growth'
>;

type ColumnNameKeys = keyof ColumnNameType;

interface ColumnTitleData {
  title: string;
  position: 'right' | 'left';
}

type ColumnTitlesValue = {
  [key in ColumnNameKeys]: ColumnTitleData;
};

export const DetailedInvestmentStatistics = () => {
  const requestCoins = useAppSelector(({ profitReducer: { coins } }) => coins);
  const [isSortedDown, setSortedDown] = useState<boolean>();

  const [coins, setCoins] = useState<CalculateCoinProfitData[]>(requestCoins);

  const columnTitle = useMemo(
    (): ColumnTitlesValue => ({
      name: { title: 'Name', position: 'left' },
      share: { title: 'Share', position: 'right' },
      startingPrice: { title: 'Start price', position: 'right' },
      averagePrice: { title: 'Avg. price', position: 'right' },
      lastPrice: { title: 'Last price', position: 'right' },
      capital: { title: 'Holdings', position: 'right' },
      growth: { title: 'Profit/Loss', position: 'right' },
    }),
    []
  );

  const coinsCopy = useMemo(
    (): CalculateCoinProfitData[] => [...requestCoins.map((value) => ({ ...value }))],
    [requestCoins]
  );

  const getSortValueForString = useCallback(
    (a: string, b: string) => {
      if (!isSortedDown) {
        return a < b ? -1 : 1;
      } else {
        return a > b ? -1 : 1;
      }
    },
    [isSortedDown]
  );

  const getSortValueForNumber = useCallback(
    (a: number, b: number) => {
      if (!isSortedDown) {
        return a - b;
      } else {
        return a + b;
      }
    },
    [isSortedDown]
  );

  const onClickSortTable = useCallback(
    (type: ColumnNameKeys) => {
      if (type === 'name') {
        setCoins(coinsCopy.sort((a, b) => getSortValueForString(a[type], b[type])));
      } else {
        setCoins(coinsCopy.sort((a, b) => getSortValueForNumber(a[type], b[type])));
      }

      setSortedDown((prev) => (prev === undefined ? true : !prev));
    },
    [coinsCopy, getSortValueForNumber, getSortValueForString]
  );

  const renderColumn = useCallback(
    ([key, { title, position }]: [string, ColumnTitleData]) => (
      <TableCell onClick={() => onClickSortTable(key as ColumnNameKeys)} title={title}>
        <Typography key={`${key}-${title}`} align={position} fontWeight="600">
          {title}
        </Typography>
      </TableCell>
    ),
    [onClickSortTable]
  );

  const renderRow = useCallback(
    ({
      coinId,
      name,
      image,
      symbol,
      share,
      startingPrice,
      averagePrice,
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
        <TableRow key={coinId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
            <Typography>${averagePrice}</Typography>
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
                  color: growth >= 0 ? PROFIT_COLOR : LOSS_COLOR,
                  fontSize: 14,
                  justifyContent: 'end',
                  fontWeight: 600,
                }}
              />
            </Box>
          </TableCell>
        </TableRow>
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
            <TableRow style={{ cursor: 'pointer' }}>
              {Object.entries(columnTitle).map(renderColumn)}
            </TableRow>
          </TableHead>

          <TableBody>{coins.map(renderRow)}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

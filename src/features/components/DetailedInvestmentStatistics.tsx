import { InvestmentPercent, MainCoinInfoContainer } from '@cc/entities/Calculate';
import {
  DetailedColumnItem,
  DetailedColumnTitleData,
  DetailedColumnTitles,
  DetailedColumnType,
  ISelectedColumnData,
} from '@cc/entities/InvestmentStatistics';
import { useAppSelector } from '@cc/shared/lib';
import variables from '@cc/shared/styles/Variables.module.scss';
import { CalculateCoinProfitData } from '@cc/shared/types';
import { SortByNumbers, SortByString } from '@cc/shared/utils';
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
  useTheme,
} from '@mui/material';
import { useCallback, useMemo, useRef, useState } from 'react';

export const DetailedInvestmentStatistics = () => {
  const requestCoins = useAppSelector(({ profitReducer: { coins } }) => coins);
  const { palette } = useTheme();

  const lastColumnName = useRef<DetailedColumnType>();

  const [selectedColumn, setSelectedColumn] = useState<ISelectedColumnData>();
  const [coins, setCoins] = useState<CalculateCoinProfitData[]>(requestCoins);

  const columnTitle = useMemo(
    (): DetailedColumnTitles => ({
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

  const onClickSortTable = useCallback(
    (column: DetailedColumnType) => {
      const isRepeatedDescending =
        selectedColumn?.isDescending === undefined ? true : !selectedColumn?.isDescending;

      const isSameColumn = lastColumnName.current === column;
      const firstSortInDescending = true;

      const isDescending = isSameColumn ? isRepeatedDescending : firstSortInDescending;

      if (column === 'name') {
        const sortedCoins = coinsCopy.sort((a, b) => SortByString(a[column], b[column]));

        setCoins(isDescending ? sortedCoins.reverse() : sortedCoins);
      } else {
        setCoins(
          coinsCopy.sort((a, b) => SortByNumbers({ a: a[column], b: b[column], isDescending }))
        );
      }

      setSelectedColumn({ column, isDescending });

      lastColumnName.current = column;
    },
    [coinsCopy, selectedColumn?.isDescending]
  );

  const renderColumn = useCallback(
    ([key, values]: [string, DetailedColumnTitleData]) => (
      <DetailedColumnItem
        key={`${key}-${values.title}`}
        column={key as DetailedColumnType}
        onClickSortTable={onClickSortTable}
        selectedColumn={selectedColumn}
        {...values}
      />
    ),
    [onClickSortTable, selectedColumn]
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

              <Typography
                style={{ color: palette.text.secondary }}
                variant="body2"
                fontWeight="500"
              >
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
                  color: growth >= 0 ? variables.profit : variables.loss,
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

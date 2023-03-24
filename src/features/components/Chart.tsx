import { GET_LOSS_COLOR, GET_PROFIT_COLOR, LOSS_COLOR, PROFIT_COLOR } from '@cc/shared/const';
import { Box, Button, Typography } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  LogarithmicScale,
  PointElement,
  TimeSeriesScale,
  Title,
  Tooltip,
  TooltipModel,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';
import { memo, useCallback, useState } from 'react';
import { Line } from 'react-chartjs-2';
import styles from '../styles/Chart.module.css';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeSeriesScale,
  LogarithmicScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface IChartProps {
  dollars: number[];
  labels: number[];
}

export const Chart: React.FC<IChartProps> = memo(({ labels, dollars }) => {
  const [isLogChart, setLogShart] = useState(false);

  const firstBalance = dollars.at(0) || 0;
  const lastBalance = dollars.at(-1) || 0;
  const isPositiveBalance = firstBalance <= lastBalance;

  const backgroundColor = isPositiveBalance ? GET_PROFIT_COLOR(0.4) : GET_LOSS_COLOR(0.4);
  const lineColor = isPositiveBalance ? PROFIT_COLOR : LOSS_COLOR;

  const onTooltipLabel = useCallback(function (this: TooltipModel<'line'>) {
    const priceValue = this.dataPoints[0].formattedValue;

    return `$${priceValue}`;
  }, []);

  const onClickButton = useCallback(() => {
    setLogShart((prev) => !prev);
  }, []);

  return (
    <>
      <Box className={styles.headContainer}>
        <Typography variant="h6" component="h2">
          Capitalization for each investment
        </Typography>

        <Button variant="text" onClick={onClickButton}>{`${
          isLogChart ? 'Line' : 'logarithmic'
        } chart`}</Button>
      </Box>

      <Box width="100%">
        <Line
          height={300}
          width="100%"
          data={{
            labels: labels.map((timestamp) =>
              DateTime.fromMillis(timestamp).toFormat('yyyy-MM-dd')
            ),
            datasets: [
              {
                label: 'Total capitalization',
                data: dollars,
                tension: 0.1,
                fill: true,
                backgroundColor,
                borderColor: lineColor,
                hoverBackgroundColor: lineColor,
                pointRadius: 3,
                pointHoverBorderWidth: 5,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            hover: { intersect: false, mode: 'nearest', axis: 'x' },
            scales: {
              x: { grid: { display: false } },
              y: {
                type: isLogChart ? 'logarithmic' : 'linear',
                ticks: { callback: (value) => `$${value}` },
              },
            },
            layout: { autoPadding: true },
            plugins: {
              tooltip: {
                callbacks: { label: onTooltipLabel },
                mode: 'nearest',
                intersect: false,
                axis: 'x',
              },
              colors: { enabled: true },
              legend: { display: false },
            },
          }}
        />
      </Box>
    </>
  );
});

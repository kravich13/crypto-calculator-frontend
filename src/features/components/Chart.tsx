import variables from '@cc/shared/styles/Variables.module.scss';
import { Box, Button, Typography, useTheme } from '@mui/material';
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
import { useTranslation } from 'next-i18next';
import { memo, useCallback, useState } from 'react';
import { Line } from 'react-chartjs-2';
import styles from '../styles/Chart.module.scss';

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
  const { palette } = useTheme();
  const { t } = useTranslation();

  const [isLogChart, setLogShart] = useState(false);

  const firstBalance = dollars.at(0) || 0;
  const lastBalance = dollars.at(-1) || 0;
  const isPositiveBalance = firstBalance <= lastBalance;

  const backgroundColor = isPositiveBalance ? variables.profit400 : variables.loss400;
  const lineColor = isPositiveBalance ? variables.profit : variables.loss;

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
          {t('cc.feature.chart.title')}
        </Typography>

        <Button variant="text" onClick={onClickButton}>
          {t(`cc.feature.chart.button.${isLogChart ? 'line' : 'logarithmic'}`)}
        </Button>
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
              x: {
                grid: { display: false },
                ticks: { color: palette.text.secondary },
                border: { color: palette.divider },
              },
              y: {
                grid: { color: palette.divider },
                type: isLogChart ? 'logarithmic' : 'linear',
                ticks: { callback: (value) => `$${value}`, color: palette.text.secondary },
                border: { color: palette.divider },
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

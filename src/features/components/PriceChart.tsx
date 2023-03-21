import { GET_LOSS_COLOR, GET_PROFIT_COLOR, LOSS_COLOR, PROFIT_COLOR } from '@cc/shared/const';
import { Box } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeSeriesScale,
  Title,
  Tooltip,
  TooltipModel,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import { memo, useCallback } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeSeriesScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface IPriceChartProps {
  prices: number[];
  labels: number[];
}

export const PriceChart: React.FC<IPriceChartProps> = memo(({ labels, prices }) => {
  const firstBalance = prices.at(0) || 0;
  const lastBalance = prices.at(-1) || 0;
  const isPositiveBalance = firstBalance <= lastBalance;

  const backgroundColor = isPositiveBalance ? GET_PROFIT_COLOR(0.4) : GET_LOSS_COLOR(0.4);
  const lineColor = isPositiveBalance ? PROFIT_COLOR : LOSS_COLOR;

  const onTooltipLabel = useCallback(function (this: TooltipModel<'line'>) {
    const priceValue = this.dataPoints[0].formattedValue;

    return `$${priceValue}`;
  }, []);

  return (
    <Box width="100%">
      <Line
        height={300}
        width="100%"
        data={{
          labels: prices.map(() => '2020-11-03'),
          datasets: [
            {
              data: prices,
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
            y: { ticks: { callback: (value) => `$${value}` } },
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
  );
});

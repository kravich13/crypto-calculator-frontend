import { Typography } from '@mui/material';
import { DateTime, Duration } from 'luxon';
import React, { memo, useEffect, useState } from 'react';

interface ITimerProps {
  inputDate: number;
  stylesProps?: {
    color?: string;
    fontSize?: number | string;
  };
}

export const Timer: React.FC<ITimerProps> = memo(({ inputDate, stylesProps }) => {
  const [text, setText] = useState('00:00');

  useEffect(() => {
    const id = setInterval(() => {
      if (inputDate < Date.now()) {
        clearInterval(id);
      } else {
        const now = DateTime.now();
        const end = DateTime.fromMillis(inputDate);
        const remaining = end.diff(now).toObject();
        const duration = Duration.fromObject(remaining);
        const result = duration.toFormat('mm:ss');

        setText(result);
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [inputDate]);

  return <Typography {...stylesProps}>{text}</Typography>;
});

import { Typography } from '@mui/material';
import { DateTime, Duration } from 'luxon';
import React, { memo, useCallback, useEffect, useState } from 'react';

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
    const time = getFormatTime(inputDate);

    if (inputDate > Date.now()) {
      setText(time);
    }

    const id = setInterval(() => {
      if (inputDate < Date.now()) {
        clearInterval(id);
      } else {
        const time = getFormatTime(inputDate);

        setText(time);
      }
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [inputDate]);

  const getFormatTime = useCallback((date: number) => {
    const now = DateTime.now();
    const end = DateTime.fromMillis(date);
    const remaining = end.diff(now).toObject();
    const duration = Duration.fromObject(remaining);

    const result = duration.toFormat('mm:ss');

    return result;
  }, []);

  return <Typography {...stylesProps}>{text}</Typography>;
});

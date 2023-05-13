import {
  BaseDescription,
  CalculateDescription,
  ICalculateData,
  ResultsDescription,
} from '@cc/entities/MainPage';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import { LayoutContent } from '@cc/shared/ui';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import step1Image from '../../public/main-page-images/step-1.jpg';
import step2Image from '../../public/main-page-images/step-2.jpg';
import step3Image from '../../public/main-page-images/step-3.jpg';

export const MainContent = () => {
  const isAuth = useAppSelector(({ authReducer }) => authReducer.isAuth);
  const router = useRouter();

  const onRedirect = useCallback(() => {
    router.push(Boolean(isAuth) ? RoutesTypes.CALCULATE_YIELD : RoutesTypes.LOGIN);
  }, [isAuth]);

  const calculateStepsData = useMemo(
    (): ICalculateData[] => [
      {
        step: 1,
        description: 'Select the monthly investment amount, start date and end date',
        src: step1Image,
      },
      {
        step: 2,
        description: 'Enter the title the coin you are interested in and select it',
        src: step2Image,
      },
      {
        step: 3,
        description: 'Allocate the monthly investment amount as a percentage for each coin',
        src: step3Image,
      },
    ],
    []
  );

  const renderStepData = useCallback(
    (data: ICalculateData) => <CalculateDescription key={data.step} {...data} />,
    []
  );

  return (
    <LayoutContent
      containerStyles={{
        maxWidth: 'lg',
        style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
      }}
    >
      <Typography component="h1" variant="h5" textAlign="center" sx={{ mb: 4 }}>
        Cryptocurrency historical data calculator
      </Typography>

      <BaseDescription />

      <Button variant="contained" onClick={onRedirect} sx={{ mt: 2, mb: 3 }}>
        {Boolean(isAuth) ? 'calculate now' : 'login now'}
      </Button>

      {calculateStepsData.map(renderStepData)}

      <ResultsDescription />
    </LayoutContent>
  );
};

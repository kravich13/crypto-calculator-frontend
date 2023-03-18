import { BaseDescription, CalculateDescription, ICalculateData } from '@cc/entities/MainPage';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import globalStyles from '@cc/shared/styles/Index.module.css';
import { ScrollTopButton } from '@cc/shared/ui';
import { Button, Container, Typography } from '@mui/material';
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
      { step: 1, description: 'tes1', src: step1Image, position: 'left' },
      { step: 2, description: 'test2', src: step2Image, position: 'right' },
      { step: 3, description: 'test3', src: step3Image, position: 'left' },
    ],
    []
  );

  const renderStepData = useCallback(
    (data: ICalculateData) => <CalculateDescription key={data.step} {...data} />,
    []
  );

  return (
    <Container
      component="div"
      maxWidth="lg"
      className={globalStyles.contentPageContainer}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography component="h1" variant="h5" textAlign="center" sx={{ mb: 4 }}>
        Cryptocurrency historical data calculator
      </Typography>

      <BaseDescription />

      <Button variant="contained" onClick={onRedirect} sx={{ mt: 2, mb: 3, width: 120 }}>
        {Boolean(isAuth) ? 'calculate now' : 'login'}
      </Button>

      {calculateStepsData.map(renderStepData)}

      <ScrollTopButton />
    </Container>
  );
};

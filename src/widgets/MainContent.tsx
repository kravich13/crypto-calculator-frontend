import {
  BaseDescription,
  CalculateDescription,
  ICalculateData,
  ResultsDescription,
  baseYAnimation,
} from '@cc/entities/MainPage';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import { CircleIndicator, LayoutContent, Typography } from '@cc/shared/ui';
import { Button } from '@mui/material';
import { Variants, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import step1Image from '../../public/main-page-images/step-1.jpg';
import step2Image from '../../public/main-page-images/step-2.jpg';
import step3Image from '../../public/main-page-images/step-3.jpg';
import step4Image from '../../public/main-page-images/step-4.jpg';
import step5Image from '../../public/main-page-images/step-5.jpg';

export const MainContent = () => {
  const isAuth = useAppSelector(({ authReducer }) => authReducer.isAuth);
  const router = useRouter();
  const { t } = useTranslation();

  const onRedirect = useCallback(() => {
    router.push(Boolean(isAuth) ? RoutesTypes.CALCULATE_YIELD : RoutesTypes.LOGIN);
  }, [isAuth]);

  const calculateStepsData = useMemo(
    (): ICalculateData[] => [
      {
        step: 1,
        description: t('cc.widget.mainContent.step1Description'),
        src: step1Image,
      },
      {
        step: 2,
        description: t('cc.widget.mainContent.step2Description'),
        src: step2Image,
      },
      {
        step: 3,
        description: t('cc.widget.mainContent.step3Description'),
        src: step3Image,
      },
    ],
    [t]
  );

  const resultsStepData = useMemo(
    (): ICalculateData[] => [
      {
        step: 4,
        description: t('cc.entity.resultsDescription.generalTitle'),
        src: step4Image,
      },
      {
        step: 5,
        description: t('cc.entity.resultsDescription.detailedTitle'),
        src: step5Image,
      },
    ],
    [t]
  );

  const renderCalculateStepData = useCallback(
    (data: ICalculateData) => <CalculateDescription key={data.step} {...data} />,
    []
  );

  const renderResultsStepData = useCallback(
    (data: ICalculateData) => <ResultsDescription key={data.step} {...data} />,
    []
  );

  return (
    <LayoutContent containerStyles={{ maxWidth: 'lg' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <CircleIndicator />

        <motion.div custom={0} variants={baseYAnimation}>
          <Typography tint component="h1" variant="h5" textAlign="center" sx={{ mb: 4 }}>
            {t('cc.widget.mainContent.title')}
          </Typography>
        </motion.div>

        <BaseDescription />

        <motion.div custom={1} variants={baseYAnimation}>
          <Button variant="contained" onClick={onRedirect} sx={{ mt: 2, mb: 3 }}>
            <Typography noWrap>
              {Boolean(isAuth)
                ? t('cc.widget.mainContent.button.calculate')
                : t('cc.widget.mainContent.button.login')}
            </Typography>
          </Button>
        </motion.div>

        {calculateStepsData.map(renderCalculateStepData)}
        {resultsStepData.map(renderResultsStepData)}
      </motion.div>
    </LayoutContent>
  );
};

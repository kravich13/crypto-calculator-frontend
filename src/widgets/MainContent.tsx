import {
  BaseDescription,
  CalculateDescription,
  ICalculateData,
  ResultsDescription,
  baseYAnimation,
} from '@cc/entities/MainPage';
import { mainStepsImages } from '@cc/shared/consts';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector, useThemeContext } from '@cc/shared/lib';
import { LanguageType } from '@cc/shared/types';
import { CircleIndicator, LayoutContent, Typography } from '@cc/shared/ui';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const MainContent = () => {
  const isAuth = useAppSelector(({ authReducer }) => authReducer.isAuth);
  const router = useRouter();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { themeMode } = useThemeContext();

  const onRedirect = useCallback(() => {
    router.push(Boolean(isAuth) ? RoutesTypes.CALCULATE_YIELD : RoutesTypes.LOGIN);
  }, [isAuth]);

  const calculateStepsData = useMemo(
    (): ICalculateData[] => [
      {
        step: 1,
        description: t('cc.widget.mainContent.step1Description'),
        src: mainStepsImages.step1[language as LanguageType][themeMode],
      },
      {
        step: 2,
        description: t('cc.widget.mainContent.step2Description'),
        src: mainStepsImages.step2[language as LanguageType][themeMode],
      },
      {
        step: 3,
        description: t('cc.widget.mainContent.step3Description'),
        src: mainStepsImages.step3[language][themeMode],
      },
    ],
    [language, t, themeMode]
  );

  const resultsStepData = useMemo(
    (): ICalculateData[] => [
      {
        step: 4,
        description: t('cc.entity.resultsDescription.generalTitle'),
        src: mainStepsImages.step5[language][themeMode],
      },
      {
        step: 5,
        description: t('cc.entity.resultsDescription.detailedTitle'),
        src: mainStepsImages.step5[language][themeMode],
      },
    ],
    [language, t, themeMode]
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

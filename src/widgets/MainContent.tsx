import {
  BaseDescription,
  CalculateDescription,
  ICalculateData,
  ResultsDescription,
} from '@cc/entities/MainPage';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector, useThemeContext } from '@cc/shared/lib';
import { LayoutContent } from '@cc/shared/ui';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import step1Image from '../../public/main-page-images/step-1.jpg';
import step2Image from '../../public/main-page-images/step-2.jpg';
import step3Image from '../../public/main-page-images/step-3.jpg';
import { useTranslation } from 'next-i18next';
import { mainStepsImages } from '@cc/shared/consts';

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
        src: mainStepsImages.step1[language][themeMode] || step1Image,
      },
      {
        step: 2,
        description: t('cc.widget.mainContent.step2Description'),
        src: mainStepsImages.step2[language][themeMode] || step2Image,
      },
      {
        step: 3,
        description: t('cc.widget.mainContent.step3Description'),
        src: mainStepsImages.step3[language][themeMode] || step3Image,
      },
    ],
    [t, themeMode, language]
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
      <Typography tint component="h1" variant="h5" textAlign="center" sx={{ mb: 4 }}>
        {t('cc.widget.mainContent.title')}
      </Typography>

      <BaseDescription />

      <Button variant="contained" onClick={onRedirect} sx={{ mt: 2, mb: 3 }}>
        <Typography noWrap>
          {Boolean(isAuth)
            ? t('cc.widget.mainContent.button.calculate')
            : t('cc.widget.mainContent.button.login')}
        </Typography>
      </Button>

      {calculateStepsData.map(renderStepData)}

      <ResultsDescription />
    </LayoutContent>
  );
};

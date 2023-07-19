import {
  BaseDescription,
  CalculateDescription,
  ICalculateData,
  ResultsDescription,
} from '@cc/entities/MainPage';
import { RoutesTypes } from '@cc/shared/enums';
import { useAppSelector } from '@cc/shared/lib';
import { LayoutContent, Typography } from '@cc/shared/ui';
import { Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import step1Image from '../../public/main-page-images/step-1.jpg';
import step2Image from '../../public/main-page-images/step-2.jpg';
import step3Image from '../../public/main-page-images/step-3.jpg';
import { Variants, motion } from 'framer-motion';

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

  const titleAndButtonAnimation = useMemo(
    (): Variants => ({
      hidden: { opacity: 0, y: 80 },
      visible: (custom) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom * 0.2, duration: 1.13, type: 'spring' },
      }),
    }),
    []
  );

  const renderStepData = useCallback(
    (data: ICalculateData) => <CalculateDescription key={data.step} {...data} />,
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
        <motion.div custom={0} variants={titleAndButtonAnimation}>
          <Typography tint component="h1" variant="h5" textAlign="center" sx={{ mb: 4 }}>
            {t('cc.widget.mainContent.title')}
          </Typography>
        </motion.div>

        <BaseDescription />

        <motion.div custom={4} variants={titleAndButtonAnimation}>
          <Button variant="contained" onClick={onRedirect} sx={{ mt: 2, mb: 3 }}>
            <Typography noWrap>
              {Boolean(isAuth)
                ? t('cc.widget.mainContent.button.calculate')
                : t('cc.widget.mainContent.button.login')}
            </Typography>
          </Button>
        </motion.div>

        {calculateStepsData.map(renderStepData)}

        <ResultsDescription />
      </motion.div>
    </LayoutContent>
  );
};

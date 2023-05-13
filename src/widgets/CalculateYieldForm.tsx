import { INPUT_FORMAT_DATE, ISelectedInvestCoinsForm } from '@cc/entities/Calculate';
import { PeriodAndAmount, SelectedInvestCoins } from '@cc/features';
import { useCalculateProfitMutation, usePeriodAndAmountMutation } from '@cc/shared/api';
import { RoutesTypes } from '@cc/shared/enums';
import {
  calculatorActions,
  profitActions,
  useAppDispatch,
  useRefreshRequest,
} from '@cc/shared/lib';
import { CalculateProfitRequest, IPeriodAndAmountForm } from '@cc/shared/types';
import { LayoutContent, PopupAlert } from '@cc/shared/ui';
import { Container, Step, StepLabel, Stepper, Typography, useMediaQuery } from '@mui/material';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const CalculateYieldForm = () => {
  const isMin520Width = useMediaQuery('(max-width:520px)');
  const router = useRouter();

  const dispatch = useAppDispatch();

  const periodAndAmountState = useForm<IPeriodAndAmountForm>({ mode: 'onBlur' });

  const [periodAndAmountRequest, periodAndAmountResponse] = usePeriodAndAmountMutation();
  const [calculateProfitRequest, calculateProfitResponse] = useCalculateProfitMutation();

  const periodRefreshData = useRefreshRequest(periodAndAmountResponse.error, () =>
    periodAndAmountRequest(periodAndAmountResponse.originalArgs!)
  );

  const calculateRefreshData = useRefreshRequest(calculateProfitResponse.error, () =>
    calculateProfitRequest(calculateProfitResponse.originalArgs!)
  );

  const isLoading =
    periodAndAmountResponse.isLoading ||
    calculateProfitResponse.isLoading ||
    periodRefreshData.isLoading ||
    calculateRefreshData.isLoading;

  const errorMessage = periodRefreshData.error.message || calculateRefreshData.error.message;
  const isError = periodRefreshData.error.showError || calculateRefreshData.error.showError;

  const [step, setStep] = useState(1);

  const onConfirmStep0: SubmitHandler<IPeriodAndAmountForm> = useCallback(async (data) => {
    dispatch(calculatorActions.setPeriodAndAmount(data));

    const startDate = DateTime.fromFormat(data.startDate, INPUT_FORMAT_DATE).toUTC().toMillis();
    const endDate = DateTime.fromFormat(data.endDate, INPUT_FORMAT_DATE).toUTC().toMillis();
    const monthlyInvestment = Number(data.monthlyInvestment);

    await periodAndAmountRequest({ startDate, endDate, monthlyInvestment });
  }, []);

  const onConfirmStep1: SubmitHandler<ISelectedInvestCoinsForm> = useCallback(
    async ({ addedCoins }) => {
      const calculateProfitBody: CalculateProfitRequest = addedCoins.map(({ coinId, percent }) => ({
        coinId,
        share: Number(percent),
      }));

      await calculateProfitRequest(calculateProfitBody);
    },
    []
  );

  const onBack = useCallback(() => {
    setStep(0);
  }, []);

  const stepRender = useMemo(
    (): Record<number, JSX.Element> => ({
      0: (
        <PeriodAndAmount
          isLoading={isLoading}
          state={periodAndAmountState}
          onConfirm={onConfirmStep0}
        />
      ),
      1: <SelectedInvestCoins isLoading={isLoading} onBack={onBack} onConfirm={onConfirmStep1} />,
    }),
    [isLoading, periodAndAmountState]
  );

  useEffect(() => {
    const periodData = periodAndAmountResponse.data;
    const profitData = calculateProfitResponse.data;

    if (step === 0 && periodData) {
      dispatch(calculatorActions.setMaxNumberOfCoinsToInvest(periodData.maxNumberOfCoinsToInvest));
      setStep(1);
      periodAndAmountResponse.reset();
    } else if (step === 1 && profitData) {
      dispatch(profitActions.setBaseProfit(profitData));
      router.push(RoutesTypes.INVESTMENT_STATISTICS);
      calculateProfitResponse.reset();
    }
  }, [step, periodAndAmountResponse.data, calculateProfitResponse.data]);

  return (
    <LayoutContent isCenterPosition containerStyles={{ maxWidth: isMin520Width ? 'xs' : 'sm' }}>
      {isError && <PopupAlert text={errorMessage} severity="error" variant="filled" />}

      <Typography component="h1" variant="h5" marginBottom={3} textAlign="center">
        Calculation of profitability monthly investments in cryptocurrency
      </Typography>

      <Stepper activeStep={step} orientation={isMin520Width ? 'vertical' : 'horizontal'}>
        <Step>
          <StepLabel>
            <Typography component="p" variant="h6">
              Dates and monthly amount
            </Typography>
          </StepLabel>
        </Step>

        <Step>
          <StepLabel>
            <Typography component="p" variant="h6">
              List of coins
            </Typography>
          </StepLabel>
        </Step>
      </Stepper>

      <Container component="div" maxWidth="xs" sx={{ marginTop: 1 }}>
        <Typography component="p" variant="subtitle1" marginTop={3}>
          {step === 0 ? 'Specify the monthly amount for investment, start and end date' : ''}
        </Typography>

        {stepRender[step]}
      </Container>
    </LayoutContent>
  );
};

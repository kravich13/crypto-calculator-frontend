import { ISelectedInvestCoinsForm } from '@cc/entities/Calculate';
import { IPeriodAndAmountForm, PeriodAndAmount, SelectedInvestCoins } from '@cc/features';
import { baseCalculatorSlice, useAppDispatch } from '@cc/shared/lib';
import { Container, Step, StepLabel, Stepper, Typography, useMediaQuery } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

interface IStepRender {
  [key: number]: JSX.Element;
}

export const CalculateYieldForm = () => {
  const isMin520Width = useMediaQuery('(max-width:520px)');
  const { setPeriodAndAmount } = baseCalculatorSlice.actions;

  const dispatch = useAppDispatch();

  const [step, setStep] = useState(0);

  const onConfirmStep0: SubmitHandler<IPeriodAndAmountForm> = useCallback(
    async ({ monthlyInvestment, startDate, endDate }) => {},
    []
  );

  const onConfirmStep1: SubmitHandler<ISelectedInvestCoinsForm> = useCallback(
    ({ addedCoins }) => {},
    []
  );

  const onBack = useCallback(() => {
    setStep(0);
  }, []);

  const stepRender: IStepRender = useMemo(
    () => ({
      0: <PeriodAndAmount onConfirm={onConfirmStep0} />,
      1: <SelectedInvestCoins onBack={onBack} onConfirm={onConfirmStep1} />,
    }),
    []
  );

  return (
    <>
      <Container component="div" maxWidth={isMin520Width ? 'xs' : 'sm'}>
        <Typography component="h1" variant="h5" marginBottom={3} textAlign="center">
          Calculation of profitability from monthly investments in cryptocurrency
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
      </Container>
      <Container component="div" maxWidth="xs" sx={{ marginTop: 1 }}>
        <Typography component="p" variant="subtitle1" marginTop={3}>
          {step === 0 ? 'Specify the monthly amount for investment, start and end date' : ''}
        </Typography>

        {stepRender[step]}
      </Container>
    </>
  );
};

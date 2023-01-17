import { Container, Step, StepLabel, Stepper, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { IPeriodAndAmountForm, PeriodAndAmount } from '../../components/calculateYield';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  },
});

interface IStepRender {
  [key: number]: JSX.Element;
}

const CalculateYieldPage: React.FC = () => {
  const isMin500Width = useMediaQuery('(max-width:400px)');
  const styles = useStyles();
  const [step, setStep] = useState(0);

  const onConfirmStep0: SubmitHandler<IPeriodAndAmountForm> = useCallback(
    async ({ monthlyInvestment, startDate, endDate }) => {},
    []
  );

  const stepRender: IStepRender = useMemo(
    () => ({
      0: <PeriodAndAmount onConfirm={onConfirmStep0} />,
    }),
    [step]
  );

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
      }}
    >
      <Container component="div" maxWidth={isMin500Width ? 'xs' : 'sm'}>
        <Typography component="h1" variant="h5" marginBottom={6} className={styles.title}>
          Calculation of profitability from monthly investments in cryptocurrency
        </Typography>

        <Stepper activeStep={step} orientation={isMin500Width ? 'vertical' : 'horizontal'}>
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
    </Container>
  );
};

export default CalculateYieldPage;

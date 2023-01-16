import { Container, Step, StepLabel, Stepper, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useMemo, useState } from 'react';
import { PeriodAndAmount } from '../../components/calculateYield';

const useStyles = makeStyles({
  subtitle: {
    textAlign: 'left',
    width: '100%',
  },
});

interface IStepRender {
  [key: number]: JSX.Element;
}

const CalculateYieldPage: React.FC = () => {
  const isMin500Width = useMediaQuery('(max-width:400px)');
  const [step, setStep] = useState(0);

  const stepRender: IStepRender = useMemo(
    () => ({
      0: <PeriodAndAmount />,
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

        <Container component="div" maxWidth="xs" sx={{ marginTop: 1 }}>
          <Typography component="p" variant="subtitle1" marginTop={3}>
            Select start date, end date and monthly investment
          </Typography>

          {stepRender[step]}
        </Container>
      </Container>
    </Container>
  );
};

export default CalculateYieldPage;

import { Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCallback } from 'react';
import { useAppSelector, useTypedNavigate } from '../../hooks';
import { RoutesTypes } from '../../navigation';

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
  },
});

const MainPage: React.FC = () => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const styles = useStyles();
  const navigate = useTypedNavigate();

  const onSignUp = useCallback(() => {
    navigate(RoutesTypes.SIGN_UP);
  }, [navigate]);

  const onCalculateYield = useCallback(() => {
    navigate(RoutesTypes.CALCULATE_YIELD);
  }, [navigate]);

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 3 }}
    >
      <Container maxWidth="xs" className={styles.container}>
        <Typography component="h1" variant="h5" marginBottom={2}>
          Calculation of profitability from monthly investments in cryptocurrency
        </Typography>

        {isAuth ? (
          <Button variant="contained" onClick={onCalculateYield}>
            Calculate yield
          </Button>
        ) : (
          <Button variant="contained" onClick={onSignUp}>
            Sign Up
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default MainPage;

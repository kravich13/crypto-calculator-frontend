import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AuthProvider } from './context';
import { RootNavigator } from './navigation';

const useStyles = makeStyles({
  Root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const App = () => {
  const classes = useStyles();

  return (
    <Box className={classes.Root} component="section">
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </Box>
  );
};

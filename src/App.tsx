import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { RootNavigator } from './navigation/RootNavigator';

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
      <RootNavigator />
    </Box>
  );
};

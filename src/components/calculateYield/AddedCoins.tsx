import { Clear } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, InputAdornment, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import { calculatorSlice } from '../../store/reducers';
import { TextInput } from '../shared/controllers';
import { IMockData } from './CoinList';

const DELETE_BUTTON_SIZE = 28;
const MR_INPUT = 10;

const useStyles = makeStyles({
  renderItemContainer: {
    '& .delete-added-coin': { display: 'none' },
    '&:hover .delete-added-coin': { display: 'flex' },
    '& .percent-coin-input': { marginRight: DELETE_BUTTON_SIZE + MR_INPUT },
    '&:hover .percent-coin-input': { marginRight: MR_INPUT },
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '8px 0',
  },
  title: { textAlign: 'center' },
  boxButton: {
    textAlign: 'center',
    margin: '10px 0',
  },
  flexContainer: { display: 'flex' },
  nameText: { paddingRight: 5 },
  input: {
    width: 60,
    marginRight: 14,
  },
  deleteButton: {
    alignSelf: 'center',
    width: DELETE_BUTTON_SIZE,
    height: DELETE_BUTTON_SIZE,
  },
});

interface IAddedCoinsProps {
  addedCoins: IMockData[];
  distributeEqually: () => void;
}

export const AddedCoins: React.FC<IAddedCoinsProps> = React.memo(
  ({ addedCoins, distributeEqually }) => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const { removeCoinFromInvestment } = calculatorSlice.actions;

    const renderItem = useCallback(
      ({ id, name, ticker }: IMockData) => (
        <Box key={id} className={styles.renderItemContainer}>
          <Box className={styles.formContainer}>
            <Box className={styles.flexContainer}>
              <Typography className={styles.nameText}>{name}</Typography>
              <Typography color="GrayText">{ticker}</Typography>
            </Box>

            <Box className={styles.flexContainer}>
              <TextInput
                variant="standard"
                size="small"
                className={['percent-coin-input', styles.input].join(' ')}
                InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment> }}
              />

              <IconButton
                onClick={() => dispatch(removeCoinFromInvestment({ id }))}
                className={['delete-added-coin', styles.deleteButton].join(' ')}
                title="Delete coin"
              >
                <Clear color="error" fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>

          <Divider />
        </Box>
      ),
      []
    );

    return (
      <>
        <Typography variant="h6" className={styles.title} style={{ marginBottom: 10 }}>
          Your added coins for investment
        </Typography>

        <Typography>
          Specify the investment percentage for each selected coin (at least 5 percent per coin)
        </Typography>

        <Box className={styles.boxButton}>
          <Button
            type="submit"
            variant="outlined"
            style={{ textTransform: 'none' }}
            onClick={distributeEqually}
          >
            Distribute equally
          </Button>
        </Box>

        {addedCoins.map(renderItem)}
      </>
    );
  }
);

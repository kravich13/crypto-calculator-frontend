import { Clear } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, InputAdornment, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback } from 'react';
import { Control } from 'react-hook-form';
import { TextController, TextInput } from '../../shared/controllers';
import { IAddedCoin, IFormState } from './CoinList';

const useStyles = makeStyles({
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
  input: { width: 80 },
  deleteButton: {
    alignSelf: 'center',
    width: 28,
    height: 28,
  },
});

interface IAddedCoinsProps {
  addedCoins: IAddedCoin[];
  control: Control<IFormState>;
  removeAddedCoin: (index: number) => void;
  distributeEqually: () => void;
}

export const AddedCoins: React.FC<IAddedCoinsProps> = React.memo(
  ({ addedCoins, control, removeAddedCoin, distributeEqually }) => {
    const styles = useStyles();

    const renderItem = useCallback(
      ({ primaryId, name, ticker }: IAddedCoin, index: number) => (
        <Box key={primaryId}>
          <Box className={styles.formContainer}>
            <Box className={styles.flexContainer}>
              <Typography className={styles.nameText}>{name}</Typography>
              <Typography color="GrayText">{ticker}</Typography>
            </Box>

            <Box className={styles.flexContainer}>
              <TextController
                controllerProps={{ control, name: `addedCoins.${index}.firstName` }}
                inputProps={{
                  variant: 'standard',
                  size: 'small',
                  className: ['percent-coin-input', styles.input].join(' '),
                  InputProps: {
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  },
                  sx: { mr: 2 },
                }}
              />

              <IconButton
                onClick={() => removeAddedCoin(index)}
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
            disabled={addedCoins.length === 0}
          >
            Distribute equally
          </Button>
        </Box>

        {addedCoins.map(renderItem)}
      </>
    );
  }
);

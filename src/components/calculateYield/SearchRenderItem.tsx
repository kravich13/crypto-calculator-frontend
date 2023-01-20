import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback } from 'react';
import { IMockData } from './CoinList';
import { useNavButtonsStyles } from './NavigationButtons';

const HOVER_COLOR = '#bbdefb';

const useStyles = makeStyles({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 10px',
    borderRadius: 8,
    cursor: 'pointer',
  },
  cryptoContainer: { display: 'flex' },
  selectedItem: { backgroundColor: HOVER_COLOR },
  hoverItem: {
    '&:hover': {
      backgroundColor: HOVER_COLOR,
    },
  },
  cryptoName: { paddingRight: 5 },
  selectContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  selectText: { paddingRight: 5 },
});

interface ISearchRenderItemProps {
  item: IMockData;
  isSelected: boolean;
  onClickSelectedItem: (item: IMockData) => void;
}

export const SearchRenderItem: React.FC<ISearchRenderItemProps> = React.memo(
  ({ item: { id, name, ticker }, isSelected, onClickSelectedItem }) => {
    const navButtonsStyles = useNavButtonsStyles();
    const styles = useStyles();

    const containerClasses = [styles.hoverItem, styles.item, isSelected && styles.selectedItem];

    return (
      <Box
        component="div"
        key={id}
        className={containerClasses.join(' ')}
        onMouseDown={() => onClickSelectedItem({ id, name, ticker })}
      >
        <Box component="div" className={styles.cryptoContainer}>
          <Typography className={styles.cryptoName}>{name}</Typography>
          <Typography color="GrayText">{ticker}</Typography>
        </Box>

        {isSelected && (
          <Box component="div" className={styles.selectContainer}>
            <Typography fontSize="small" color="GrayText" className={styles.selectText}>
              Select
            </Typography>
            <Box fontSize="small" color="#1565c0" className={navButtonsStyles.button}>
              ↵
            </Box>
          </Box>
        )}
      </Box>
    );
  }
);

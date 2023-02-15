import { Box, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { IMockData } from '../types';
import { useNavButtonsStyles } from './SearchNavigationButtons';

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
    const isMin990Width = useMediaQuery('(min-width:990px)');
    const isMax400Width = useMediaQuery('(max-width:400px)');

    const navButtonsStyles = useNavButtonsStyles();
    const styles = useStyles();

    const containerClasses = [styles.hoverItem, styles.item, isSelected && styles.selectedItem];

    const characters = isMax400Width ? 20 : 28;
    const nameTitle = name.length >= characters ? `${name.substring(0, characters)}...` : name;

    return (
      <Box
        component="div"
        key={id}
        className={containerClasses.join(' ')}
        onMouseDown={() => onClickSelectedItem({ id, name, ticker })}
      >
        <Box component="div" className={styles.cryptoContainer}>
          <Typography className={styles.cryptoName} title={name}>
            {nameTitle}
          </Typography>
          <Typography color="GrayText">{ticker}</Typography>
        </Box>

        {isSelected && isMin990Width && (
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

import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { IMockData } from '../types';

import navigationButtonStyles from '../styles/SearchNavigationButtons.module.css';
import styles from '../styles/SearchRenderItem.module.css';

interface ISearchRenderItemProps {
  item: IMockData;
  isSelected: boolean;
  onClickSelectedItem: (item: IMockData) => void;
}

export const SearchRenderItem: React.FC<ISearchRenderItemProps> = React.memo(
  ({ item: { id, name, ticker }, isSelected, onClickSelectedItem }) => {
    const isMin990Width = useMediaQuery('(min-width:990px)');
    const isMax400Width = useMediaQuery('(max-width:400px)');

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
            <Box fontSize="small" color="#1565c0" className={navigationButtonStyles.button}>
              ↵
            </Box>
          </Box>
        )}
      </Box>
    );
  }
);

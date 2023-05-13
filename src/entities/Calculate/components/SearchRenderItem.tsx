import { PRIMARY_COLOR } from '@cc/shared/const';
import { IMainCoinInfo } from '@cc/shared/types';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import navigationButtonStyles from '../styles/SearchNavigationButtons.module.css';
import styles from '../styles/SearchRenderItem.module.css';
import { MainCoinInfoContainer } from './MainCoinInfoContainer';
import { useThemeContext } from '@cc/shared/lib';

interface ISearchRenderItemProps {
  item: IMainCoinInfo;
  isSelected: boolean;
  onClickSelectedItem: (item: IMainCoinInfo) => void;
}

export const SearchRenderItem: React.FC<ISearchRenderItemProps> = React.memo(
  ({ item: { coinId, name, symbol, image }, isSelected, onClickSelectedItem }) => {
    const isMin990Width = useMediaQuery('(min-width:990px)');
    const isMax400Width = useMediaQuery('(max-width:400px)');
    const { themeMode } = useThemeContext();
    const { palette } = useTheme();

    const containerClasses = [
      styles.item,
      themeMode === 'light' ? styles.hoverLightItem : styles.hoverDarkItem,
    ];

    if (isSelected) {
      containerClasses.push(
        themeMode === 'light' ? styles.selectedLightItem : styles.selectedDarkItem
      );
    }

    const characters = isMax400Width ? 20 : 28;
    const nameTitle = name.length >= characters ? `${name.substring(0, characters)}...` : name;

    return (
      <Box
        component="div"
        className={containerClasses.join(' ')}
        onMouseDown={() => onClickSelectedItem({ coinId, name, image, symbol })}
      >
        <MainCoinInfoContainer image={image} name={nameTitle} symbol={symbol} />

        {isSelected && isMin990Width && (
          <Box component="div" className={styles.selectContainer}>
            <Typography fontSize="small" style={{ color: palette.text.secondary }}>
              Select
            </Typography>

            <Box fontSize="small" color={PRIMARY_COLOR} className={navigationButtonStyles.button}>
              ↵
            </Box>
          </Box>
        )}
      </Box>
    );
  }
);

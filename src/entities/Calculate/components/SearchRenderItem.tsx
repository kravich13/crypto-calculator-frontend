import { useThemeContext } from '@cc/shared/lib';
import variables from '@cc/shared/styles/Variables.module.scss';
import { IMainCoinInfo } from '@cc/shared/types';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import navigationButtonStyles from '../styles/SearchNavigationButtons.module.scss';
import styles from '../styles/SearchRenderItem.module.scss';
import { MainCoinInfoContainer } from './MainCoinInfoContainer';
import { useTranslation } from 'next-i18next';

interface ISearchRenderItemProps {
  item: IMainCoinInfo;
  isSelected: boolean;
  onClickSelectedItem: (item: IMainCoinInfo) => void;
}

export const SearchRenderItem: React.FC<ISearchRenderItemProps> = React.memo(
  ({ item: { coinId, name, symbol, image }, isSelected, onClickSelectedItem }) => {
    const isMin990Width = useMediaQuery('(min-width:990px)');
    const { themeMode } = useThemeContext();
    const { palette } = useTheme();
    const { t } = useTranslation();

    const containerClasses = [
      styles.item,
      themeMode === 'light' ? styles.hoverLightItem : styles.hoverDarkItem,
    ];

    if (isSelected) {
      containerClasses.push(
        themeMode === 'light' ? styles.selectedLightItem : styles.selectedDarkItem
      );
    }

    return (
      <Box
        component="div"
        className={containerClasses.join(' ')}
        onMouseDown={() => onClickSelectedItem({ coinId, name, image, symbol })}
      >
        <MainCoinInfoContainer image={image} name={name} symbol={symbol} />

        {isSelected && isMin990Width && (
          <Box component="div" className={styles.selectContainer}>
            <Typography fontSize="small" style={{ color: palette.text.secondary }} noWrap>
              {t('cc.entity.searchRenderItem.select')}
            </Typography>

            <Box
              fontSize="small"
              color={variables.primaryLight}
              className={navigationButtonStyles.button}
            >
              ↵
            </Box>
          </Box>
        )}
      </Box>
    );
  }
);

import { useThemeContext } from '@cc/shared/lib';
import { IMainCoinInfo } from '@cc/shared/types';
import { TextInput } from '@cc/shared/ui/components';
import { SearchOutlined } from '@mui/icons-material';
import { Box, InputAdornment, useMediaQuery } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UseFieldArrayPrepend } from 'react-hook-form';
import styles from '../styles/SearchInput.module.scss';
import { ISelectedInvestCoinsForm } from '../types';
import { SearchNavigationButtons } from './SearchNavigationButtons';
import { SearchRenderItem } from './SearchRenderItem';

interface ISearchInputProps {
  isLoading: boolean;
  searchData: IMainCoinInfo[];
  label: string;
  canAddCoin: boolean;
  prependSelectedCoin: UseFieldArrayPrepend<ISelectedInvestCoinsForm>;
  makeSearchRequest: (searchText: string) => void;
}

export const SearchInput: React.FC<ISearchInputProps> = memo(
  ({ isLoading, searchData, label, canAddCoin, prependSelectedCoin, makeSearchRequest }) => {
    const isMin990Width = useMediaQuery('(min-width:990px)');
    const { themeMode } = useThemeContext();

    const $container = useRef<HTMLDivElement>();
    const $searchInput = useRef<HTMLInputElement>();
    const [searchValue, setSearchValue] = useState('');
    const [showElements, setShowElements] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IMainCoinInfo>();

    const searchContainerStyles = [
      styles.searchContainer,
      themeMode === 'light' ? styles.searchLightContainer : styles.searchDarkContainer,
    ];

    useEffect(() => {
      setSelectedItem(searchData[0]);
    }, [searchData]);

    useEffect(() => {
      if (!canAddCoin) {
        setShowElements(false);
      }
    }, [canAddCoin]);

    useEffect(() => {
      return () => {
        debounceFetch.cancel();
      };
    });

    const debounceFetch = useMemo(() => debounce(makeSearchRequest, 300), []);

    useEffect(() => {
      debounceFetch(searchValue);
    }, [searchValue]);

    const onClickSelectedItem = useCallback(
      (item: IMainCoinInfo) => {
        setSelectedItem(item);
        prependSelectedCoin({ ...item, percent: '' });
        setSearchValue('');
      },
      [prependSelectedCoin]
    );

    const onChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    }, []);

    const onClearSearch = useCallback(() => {
      setSearchValue('');
    }, []);

    const onFocusSearch = useCallback(() => {
      setShowElements(true);
    }, []);

    const onBlurSearch = useCallback(() => {
      setShowElements(false);
      onClearSearch();
    }, []);

    const onKeyDownSearch = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (searchData.length > 0) {
          if (event.code === 'ArrowUp') {
            event.preventDefault();

            setSelectedItem((prev) => {
              const currentIndex = searchData.findIndex(({ coinId }) => coinId === prev?.coinId);
              return searchData[currentIndex === 0 ? searchData.length - 1 : currentIndex - 1];
            });
          } else if (event.code === 'ArrowDown') {
            event.preventDefault();

            setSelectedItem((prev) => {
              const currentIndex = searchData.findIndex(({ coinId }) => coinId === prev?.coinId);
              return searchData[currentIndex === searchData.length - 1 ? 0 : currentIndex + 1];
            });
          }
        }

        if (event.code === 'Escape') {
          $searchInput.current?.blur();
        } else if (event.code === 'Enter' && selectedItem) {
          onClickSelectedItem(selectedItem);
          $searchInput.current?.blur();
        }
      },
      [onClickSelectedItem, searchData, selectedItem]
    );

    const renderItem = useCallback(
      (item: IMainCoinInfo, index: number) => (
        <SearchRenderItem
          key={`${item.coinId}-${index}`}
          item={item}
          isSelected={item.coinId === selectedItem?.coinId}
          onClickSelectedItem={onClickSelectedItem}
        />
      ),
      [onClickSelectedItem, selectedItem?.coinId]
    );

    return (
      <Box component="div" ref={$container} className={styles.container}>
        <TextInput
          inputRef={$searchInput}
          type="text"
          fullWidth
          label={label}
          autoComplete="off"
          value={searchValue}
          onChange={onChangeSearch}
          onBlur={onBlurSearch}
          onFocus={onFocusSearch}
          onKeyDown={onKeyDownSearch}
          onClearValue={onClearSearch}
          disabled={!canAddCoin || isLoading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
        <AnimatePresence>
          {showElements && Boolean(searchData.length) && (
            <motion.div
              className={searchContainerStyles.join(' ')}
              style={{ width: $container.current!.clientWidth, overflow: 'hidden' }}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.15 }}
            >
              {searchData.map(renderItem)}

              {isMin990Width && <SearchNavigationButtons />}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    );
  }
);

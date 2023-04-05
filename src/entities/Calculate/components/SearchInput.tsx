import { IMainCoinInfo } from '@cc/shared/types';
import { TextInput } from '@cc/shared/ui';
import { SearchOutlined } from '@mui/icons-material';
import { Box, InputAdornment, useMediaQuery } from '@mui/material';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UseFieldArrayPrepend } from 'react-hook-form';
import styles from '../styles/SearchInput.module.css';
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

export const SearchInput: React.FC<ISearchInputProps> = React.memo(
  ({ isLoading, searchData, label, canAddCoin, prependSelectedCoin, makeSearchRequest }) => {
    const isMin990Width = useMediaQuery('(min-width:990px)');

    const $container = useRef<HTMLDivElement>();
    const $searchInput = useRef<HTMLInputElement>();
    const [searchValue, setSearchValue] = useState('');
    const [showElements, setShowElements] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IMainCoinInfo>();

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
      [searchData, selectedItem]
    );

    const renderItem = useCallback(
      (item: IMainCoinInfo) => (
        <SearchRenderItem
          key={item.coinId}
          item={item}
          isSelected={item.coinId === selectedItem?.coinId}
          onClickSelectedItem={onClickSelectedItem}
        />
      ),
      [selectedItem]
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

        {showElements && Boolean(searchData.length) && (
          <Box
            className={styles.searchContainer}
            style={{ width: $container.current!.clientWidth }}
          >
            {searchData.map(renderItem)}
            {isMin990Width && <SearchNavigationButtons />}
          </Box>
        )}
      </Box>
    );
  }
);

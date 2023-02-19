import { TextInput } from '@cc/shared/ui';
import { SearchOutlined } from '@mui/icons-material';
import { Box, InputAdornment, useMediaQuery } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UseFieldArrayPrepend } from 'react-hook-form';
import { IMockData, ISelectedInvestCoinsForm } from '../types';
import { SearchNavigationButtons } from './SearchNavigationButtons';
import { SearchRenderItem } from './SearchRenderItem';

import styles from '../styles/SearchInput.module.css';

interface ISearchInput {
  searchData: IMockData[];
  label: string;
  prependSelectedCoin: UseFieldArrayPrepend<ISelectedInvestCoinsForm>;
}

export const SearchInput: React.FC<ISearchInput> = ({ searchData, label, prependSelectedCoin }) => {
  const isMin990Width = useMediaQuery('(min-width:990px)');

  const $container = useRef<HTMLDivElement>();
  const $searchInput = useRef<HTMLInputElement>();

  const [searchValue, setSearchValue] = useState('');
  const [showElements, setShowElements] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IMockData>();

  useEffect(() => {
    setSelectedItem(searchData[0]);
  }, [searchData]);

  const onClickSelectedItem = useCallback(
    (item: IMockData) => {
      const { id, ...itemData } = item;

      setSelectedItem(item);
      prependSelectedCoin({ ...itemData, percent: '', primaryId: id });
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
            const currentIndex = searchData.findIndex(({ id }) => id === prev?.id);
            return searchData[currentIndex === 0 ? searchData.length - 1 : currentIndex - 1];
          });
        } else if (event.code === 'ArrowDown') {
          event.preventDefault();

          setSelectedItem((prev) => {
            const currentIndex = searchData.findIndex(({ id }) => id === prev?.id);
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
    (item: IMockData) => (
      <SearchRenderItem
        key={item.id}
        item={item}
        isSelected={item.id === selectedItem?.id}
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
      />

      {showElements && (
        <Box className={styles.searchContainer} style={{ width: $container.current!.clientWidth }}>
          {searchData.map(renderItem)}

          {isMin990Width && <SearchNavigationButtons />}
        </Box>
      )}
    </Box>
  );
};

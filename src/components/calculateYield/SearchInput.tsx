import { SearchOutlined } from '@mui/icons-material';
import { Box, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { calculatorSlice } from '../../store/reducers';
import { TextInput } from '../shared/controllers';
import { IMockData } from './CoinList';
import { NavigationButtons } from './NavigationButtons';
import { SearchRenderItem } from './SearchRenderItem';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  searchContainer: {
    position: 'absolute',
    background: 'white',
    padding: '8px',
    borderLeft: '2px solid #1876d1',
    borderBottom: '2px solid #1876d1',
    borderRight: '2px solid #1876d1',
    borderRadius: 4,
  },
});

interface ISearchInput {
  searchData: IMockData[];
  label: string;
}

export const SearchInput: React.FC<ISearchInput> = ({ searchData, label }) => {
  const { addCoinToInvestment } = calculatorSlice.actions;
  const dispatch = useAppDispatch();

  const $container = useRef<HTMLDivElement>();
  const $searchInput = useRef<HTMLInputElement>();

  const styles = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [showElements, setShowElements] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IMockData>();

  useEffect(() => {
    setSelectedItem(searchData[0]);
  }, [searchData]);

  const onClickSelectedItem = useCallback((item: IMockData) => {
    setSelectedItem(item);
    dispatch(addCoinToInvestment(item));
  }, []);

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
    (item: IMockData) => {
      return (
        <SearchRenderItem
          key={item.id}
          item={item}
          isSelected={item.id === selectedItem?.id}
          onClickSelectedItem={onClickSelectedItem}
        />
      );
    },
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

          <NavigationButtons />
        </Box>
      )}
    </Box>
  );
};

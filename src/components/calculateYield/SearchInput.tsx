import { SearchOutlined } from '@mui/icons-material';
import { Box, InputAdornment } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { TextInput } from '../shared/controllers';
import { IMockData } from './CoinList';
import { NavigationButtons } from './NavigationButtons';

interface ISearchInput {
  searchData: IMockData[];
  label: string;
}

export const SearchInput: React.FC<ISearchInput> = ({ searchData, label }) => {
  const $container = useRef<HTMLDivElement>();
  const $searchInput = useRef<HTMLInputElement>();

  const [searchValue, setSearchValue] = useState('');
  const [showElements, setShowElements] = useState(false);

  const onClickSelectedItem = useCallback((id: string) => {
    setShowElements(false);
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
    // setShowElements(false);
    // onClearSearch();
  }, []);

  const onKeyDownSearch = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'ArrowUp') {
      event.preventDefault();
    } else if (event.code === 'ArrowDown') {
      event.preventDefault();
    } else if (event.code === 'Escape') {
      $searchInput.current?.blur();
    }
  }, []);

  const renderItem = useCallback(
    ({ id, name, ticker }: IMockData, index: number) => (
      <Box
        key={id}
        className="search-crypto-elem"
        style={{ padding: '6px 10px', borderRadius: 8 }}
        onMouseDown={() => onClickSelectedItem(id)}
      >
        {name} {ticker}
      </Box>
    ),
    []
  );

  return (
    <Box component="div" ref={$container} style={{ position: 'relative', zIndex: 1 }}>
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
        <Box
          style={{
            position: 'absolute',
            background: 'white',
            border: '1px solid black',
            padding: '8px',
            width: $container.current!.clientWidth,
          }}
        >
          {searchData.map(renderItem)}

          <NavigationButtons />
        </Box>
      )}
    </Box>
  );
};

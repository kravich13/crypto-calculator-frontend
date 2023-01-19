import { SearchOutlined } from '@mui/icons-material';
import { Box, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback, useRef, useState } from 'react';
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
    border: '1px solid black',
    padding: '8px',
  },
});

interface ISearchInput {
  searchData: IMockData[];
  label: string;
}

export const SearchInput: React.FC<ISearchInput> = ({ searchData, label }) => {
  const $container = useRef<HTMLDivElement>();
  const $searchInput = useRef<HTMLInputElement>();

  const styles = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [showElements, setShowElements] = useState(false);
  const [selectedId, setSelectedId] = useState(searchData[0].id);

  const onClickSelectedItem = useCallback((id: string) => {
    setSelectedId(id);
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
    console.log('tut');
    setShowElements(false);
    onClearSearch();
  }, []);

  const onKeyDownSearch = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (searchData.length === 0) {
        return;
      }

      if (event.code === 'ArrowUp') {
        event.preventDefault();

        setSelectedId((prevId) => {
          const currentIndex = searchData.findIndex(({ id }) => id === prevId);
          return searchData[currentIndex === 0 ? searchData.length - 1 : currentIndex - 1].id;
        });
      } else if (event.code === 'ArrowDown') {
        event.preventDefault();

        setSelectedId((prevId) => {
          const currentIndex = searchData.findIndex(({ id }) => id === prevId);
          return searchData[currentIndex === searchData.length - 1 ? 0 : currentIndex + 1].id;
        });
      } else if (event.code === 'Escape') {
        $searchInput.current?.blur();
      } else if (event.code === 'Enter') {
        onClickSelectedItem(selectedId);
        $searchInput.current?.blur();
      }
    },
    [searchData, selectedId]
  );

  const renderItem = useCallback(
    (item: IMockData) => (
      <SearchRenderItem
        key={item.id}
        item={item}
        isSelected={item.id === selectedId}
        onClickSelectedItem={onClickSelectedItem}
      />
    ),
    [selectedId]
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

import { useThemeContext } from '@cc/shared/lib';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, TableCell, Typography, useTheme } from '@mui/material';
import { useCallback, useMemo } from 'react';
import styles from '../styles/DetailedColumnItem.module.scss';
import { DetailedColumnPosition, DetailedColumnType, ISelectedColumnData } from '../types';

interface IDetailedColumnItemProps {
  column: DetailedColumnType;
  selectedColumn?: ISelectedColumnData;
  title: string;
  position: DetailedColumnPosition;
  onClickSortTable: (type: DetailedColumnType) => void;
}

export const DetailedColumnItem: React.FC<IDetailedColumnItemProps> = ({
  column,
  selectedColumn,
  position,
  title,
  onClickSortTable,
}) => {
  const { themeMode } = useThemeContext();
  const { palette } = useTheme();

  const currentColumn = selectedColumn?.column === column;

  const renderSortButton = useMemo(
    () => (selectedColumn?.isDescending ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />),
    [selectedColumn?.isDescending]
  );

  const renderSortButtonContent = useCallback(
    (showContent: boolean) => (
      <>
        {showContent && !currentColumn && <Box style={{ width: '24px', height: '24px' }} />}
        {showContent && currentColumn && renderSortButton}
      </>
    ),
    [currentColumn, renderSortButton]
  );

  return (
    <TableCell
      onClick={() => onClickSortTable(column)}
      title={title}
      style={{ background: themeMode === 'light' ? palette.background.default : palette.grey[900] }}
    >
      <Box
        className={styles.container}
        style={{ justifyContent: position === 'right' ? 'flex-end' : 'flex-start' }}
      >
        {renderSortButtonContent(position === 'right')}

        <Typography key={`${column}-${title}`} fontWeight="600">
          {title}
        </Typography>

        {renderSortButtonContent(position === 'left')}
      </Box>
    </TableCell>
  );
};

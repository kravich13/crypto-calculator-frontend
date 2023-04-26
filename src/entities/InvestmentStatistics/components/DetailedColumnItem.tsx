import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, TableCell, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import styles from '../styles/DetailedColumnItem.module.css';
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
  const currentColumn = selectedColumn?.column === column;

  const renderSortButton = useMemo(
    () => (selectedColumn?.isSortDown ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />),
    [selectedColumn?.isSortDown]
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
    <TableCell onClick={() => onClickSortTable(column)} title={title}>
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

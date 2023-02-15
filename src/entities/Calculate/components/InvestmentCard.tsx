import { DeleteForever as DeleteForeverIcon } from '@mui/icons-material';
import { Box, Card, IconButton, Typography, useMediaQuery } from '@mui/material';
import React from 'react';

interface IInvestmentCardProps {
  onChangeCard: () => void;
  onDeleteCard: () => void;
}

export const InvestmentCard: React.FC<IInvestmentCardProps> = ({ onChangeCard, onDeleteCard }) => {
  const isMin450Width = useMediaQuery('(max-width:450px)');

  return (
    <Card
      variant="elevation"
      raised
      style={{
        display: 'flex',
        flexDirection: isMin450Width ? 'column' : 'row',
        alignItems: isMin450Width ? 'center' : 'normal',
        padding: 20,
        marginBottom: 30,
        cursor: 'pointer',
      }}
      title="Go to change card"
      onClick={onChangeCard}
    >
      <Box
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: isMin450Width ? 'row' : 'column',
          justifyContent: isMin450Width ? 'space-around' : 'space-between',
          alignItems: 'start',
          width: '100%',
        }}
        mb={isMin450Width ? 1 : 0}
      >
        <Typography>+1300 %</Typography>
        <Typography>13 coins</Typography>
      </Box>

      <Box style={{ flex: 2 }}>
        <Typography>Monthly amount: 250$</Typography>
        <Typography>From: 02/09/2019</Typography>
        <Typography>Before: 02/09/2021</Typography>
      </Box>

      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton title="Delete card" color="error" onClick={onDeleteCard}>
          <DeleteForeverIcon cursor={'pointer'} fontSize="large" color="error" />
        </IconButton>
      </Box>
    </Card>
  );
};

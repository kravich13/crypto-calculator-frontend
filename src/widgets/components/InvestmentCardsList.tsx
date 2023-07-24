import { InvestmentCard } from '@cc/entities/Calculate';
import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

export const InvestmentCardsList = () => {
  const [fakeState, setFakeState] = useState<any>([1, 2]);

  const createCard = useCallback(() => {}, []);

  const changeCard = useCallback(() => {}, []);

  const deleteCard = useCallback(() => {}, []);

  const cardRender = useCallback(
    (data: any, index: number) => (
      <InvestmentCard key={index} onChangeCard={changeCard} onDeleteCard={deleteCard} />
    ),
    []
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5">Your list with investment cards</Typography>

      <Button
        variant="text"
        style={{ lineHeight: 0 }}
        sx={{ marginBottom: 4, marginTop: 4 }}
        startIcon={<AddIcon fontSize="small" />}
        onClick={createCard}
      >
        create card
      </Button>

      <Container maxWidth="xs">{fakeState.map(cardRender)}</Container>
    </Box>
  );
};

import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvestmentCard } from '../../components/investmentCards/InvestmentCard';

export const InvestmentCardsPages: React.FC = () => {
  const navigate = useNavigate();

  const [fakeState, setFakeState] = useState<any>([1, 2]);

  const createCard = useCallback(() => {}, []);

  const changeCard = useCallback(() => {
    navigate('/investment-calculator');
  }, []);

  const deleteCard = useCallback(() => {}, []);

  const cardRender = useCallback(
    (data: any, index: number) => (
      <InvestmentCard key={index} onChangeCard={changeCard} onDeleteCard={deleteCard} />
    ),
    []
  );

  return (
    <Container component="main" maxWidth="xl" sx={{ width: '100%', height: '100%', padding: 3 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
    </Container>
  );
};

import { Box, Container } from '@mui/material';

export const MainPage: React.FC = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
        }}
      >
        Main
      </Box>
    </Container>
  );
};

import { Footer, Header, ModalLogout } from '@cc/widgets';
import { Box, Container, SxProps } from '@mui/material';
import NextNProgress from 'nextjs-progressbar';

const pageStyles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 3,
  paddingBottom: 3,
} as SxProps;

interface IlayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<IlayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NextNProgress options={{ easing: 'ease' }} color="rgb(252, 248, 3, 0.83)" />

      <ModalLogout />

      <Header />

      <Container component="main" maxWidth="xl" sx={pageStyles}>
        {children}
      </Container>

      <Footer />
    </Box>
  );
};

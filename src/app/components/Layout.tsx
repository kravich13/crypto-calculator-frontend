import { Footer, Header, ModalLogout } from '@cc/widgets';
import { Box } from '@mui/material';
import NextNProgress from 'nextjs-progressbar';

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

      {children}

      <Footer />
    </Box>
  );
};

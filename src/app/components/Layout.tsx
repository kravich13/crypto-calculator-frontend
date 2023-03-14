import { Footer, Header, ModalLogout } from '@cc/widgets';
import { Box } from '@mui/material';
import NextNProgress from 'nextjs-progressbar';
import styles from '../styles/Layout.module.css';

interface IlayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<IlayoutProps> = ({ children }) => {
  return (
    <Box className={styles.layout}>
      <NextNProgress options={{ easing: 'ease' }} color="rgb(252, 248, 3, 0.83)" />

      <ModalLogout />

      <Header />

      {children}

      <Footer />
    </Box>
  );
};

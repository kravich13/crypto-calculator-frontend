import { IChildrenProps } from '@cc/shared/types';
import { Footer, Header, ModalLogin, ModalLogout } from '@cc/widgets';
import { Box } from '@mui/material';
import NextNProgress from 'nextjs-progressbar';
import styles from '../styles/Layout.module.css';

interface IlayoutProps extends IChildrenProps {}

export const Layout: React.FC<IlayoutProps> = ({ children }) => {
  return (
    <Box className={styles.layout}>
      <NextNProgress options={{ easing: 'ease' }} color="rgb(252, 248, 3, 0.83)" />

      <ModalLogout />
      <ModalLogin />

      <Header />

      {children}

      <Footer />
    </Box>
  );
};

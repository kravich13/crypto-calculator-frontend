import { Footer, Header } from '@cc/widgets';
import { Box, Container, SxProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NextNProgress from 'nextjs-progressbar';

const useStyles = makeStyles(
  {
    Root: {
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  { name: 'MuiExamle_MainLayout' }
);

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
  const styles = useStyles();

  return (
    <Box className={styles.Root}>
      <NextNProgress options={{ easing: 'ease' }} color="rgb(252, 248, 3, 0.83)" />

      <Header />

      <Container component="main" maxWidth="xl" sx={pageStyles}>
        {children}
      </Container>

      <Footer />
    </Box>
  );
};

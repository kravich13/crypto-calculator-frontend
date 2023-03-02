import { Container } from '@mui/material';

const pageStyles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 3,
  paddingBottom: 3,
} as { [key: string]: number | string };

interface IPagelayoutProps {
  centerContent?: boolean;
  children: React.ReactNode;
}

export const PageLayout: React.FC<IPagelayoutProps> = ({ centerContent, children }) => {
  if (centerContent) {
    pageStyles.marginTop = 'auto';
  }

  return (
    <Container component="main" maxWidth="xl" sx={pageStyles}>
      {children}
    </Container>
  );
};

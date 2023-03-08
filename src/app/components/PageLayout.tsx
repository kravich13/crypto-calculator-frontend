import { Box } from '@mui/material';

const pageStyles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
} as { [key: string]: number | string };

interface IPagelayoutProps {
  centerContent?: boolean;
  fullContent?: boolean;
  children: React.ReactNode;
}

export const PageLayout: React.FC<IPagelayoutProps> = ({ centerContent, children }) => {
  if (centerContent) {
    pageStyles.marginTop = 'auto';
  }

  return (
    <Box component="main" maxWidth="xl" sx={pageStyles}>
      {children}
    </Box>
  );
};

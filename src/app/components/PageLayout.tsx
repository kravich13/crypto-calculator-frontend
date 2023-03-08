import { Box } from '@mui/material';

const pageStyles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
} as { [key: string]: number | string };

interface IPagelayoutProps {
  fullContent?: boolean;
  centerContent?: boolean;
  children: React.ReactNode;
}

export const PageLayout: React.FC<IPagelayoutProps> = ({
  centerContent = false,
  fullContent = false,
  children,
}) => {
  if (centerContent) {
    pageStyles.marginTop = 'auto';
  }

  if (!fullContent) {
    (pageStyles.paddingTop = 3), (pageStyles.paddingBottom = 3);
  }

  return (
    <Box component="main" maxWidth="xl" sx={pageStyles}>
      {children}
    </Box>
  );
};

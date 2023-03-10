import { Box } from '@mui/material';
import styles from '../styles/PageLayout.module.css';

interface IPagelayoutProps {
  centerContent?: boolean;
  fullContent?: boolean;
  children: React.ReactNode;
}

export const PageLayout: React.FC<IPagelayoutProps> = ({ centerContent = false, children }) => {
  const classes = [styles.container];

  if (centerContent) {
    classes.push(styles.centerContainer);
  }

  return (
    <Box component="main" maxWidth="xl" className={classes.join(' ')}>
      {children}
    </Box>
  );
};

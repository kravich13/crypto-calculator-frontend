import { IChildrenProps } from '@cc/shared/types';
import { Box } from '@mui/material';
import styles from '../styles/PageLayout.module.css';

interface IPagelayoutProps extends IChildrenProps {
  centerContent?: boolean;
  fullContent?: boolean;
}

export const PageLayout: React.FC<IPagelayoutProps> = ({ centerContent = false, children }) => {
  const classes = [styles.container];

  if (centerContent) {
    classes.push(styles.centerContainer);
  }

  return (
    <Box component="main" className={classes.join(' ')}>
      {children}
    </Box>
  );
};

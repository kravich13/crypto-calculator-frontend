import { IChildrenProps } from '@cc/shared/types';
import { Box } from '@mui/material';
import styles from '../styles/PageLayout.module.scss';
import { useThemeContext } from '@cc/shared/lib';

interface IPagelayoutProps extends IChildrenProps {
  centerContent?: boolean;
  fullContent?: boolean;
}

export const PageLayout: React.FC<IPagelayoutProps> = ({ centerContent = false, children }) => {
  const { themeMode } = useThemeContext();

  const classes = [
    styles.container,
    themeMode === 'light' ? styles.lightBGImage : styles.darkBGImage,
  ];

  if (centerContent) {
    classes.push(styles.centerContainer);
  }

  return (
    <Box component="main" className={classes.join(' ')}>
      {children}
    </Box>
  );
};

import { useThemeContext } from '@cc/shared/lib';
import { Container, ContainerProps, useTheme } from '@mui/material';
import { IChildrenProps } from '../../types';
import styles from '../styles/LayoutContent.module.scss';

interface ILayoutContentProps extends IChildrenProps {
  containerStyles?: ContainerProps;
  isCenterPosition?: boolean;
}

export const LayoutContent: React.FC<ILayoutContentProps> = ({
  children,
  containerStyles,
  isCenterPosition,
}) => {
  const { themeMode } = useThemeContext();
  const { palette } = useTheme();

  const mainClasses: string[] = [];

  if (isCenterPosition) {
    mainClasses.push(styles.centerContainer);
    mainClasses.push(
      themeMode === 'light' ? styles.lightCenterContainer : styles.darkCenterContainer
    );
  } else {
    mainClasses.push(styles.container);
    mainClasses.push(themeMode === 'light' ? styles.lightContainer : styles.darkContainer);
  }

  return (
    <Container
      className={[...mainClasses, containerStyles?.className].join(' ')}
      sx={{
        borderLeft: `1px solid ${palette.divider}`,
        borderRight: `1px solid ${palette.divider}`,
      }}
      {...containerStyles}
    >
      {children}
    </Container>
  );
};

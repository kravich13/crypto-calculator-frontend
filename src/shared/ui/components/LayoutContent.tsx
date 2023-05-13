import { useThemeContext } from '@cc/shared/lib';
import { Container, ContainerProps } from '@mui/material';
import { IChildrenProps } from '../../types';
import styles from '../styles/LayoutContent.module.css';

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
      {...containerStyles}
    >
      {children}
    </Container>
  );
};

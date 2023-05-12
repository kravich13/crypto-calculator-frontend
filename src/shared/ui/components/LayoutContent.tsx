import { Container, ContainerProps } from '@mui/material';
import { IChildrenProps } from '../../types';
import styles from './styles/LayoutContent.module.css';

interface ILayoutContentProps extends IChildrenProps {
  containerStyles: ContainerProps;
}

export const LayoutContent: React.FC<ILayoutContentProps> = ({ children, containerStyles }) => {
  const { className } = containerStyles;

  return (
    <Container className={[styles.container, className].join(' ')} {...containerStyles}>
      {children}
    </Container>
  );
};

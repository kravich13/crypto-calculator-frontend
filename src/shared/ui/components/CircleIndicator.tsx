import { motion, useScroll, useSpring } from 'framer-motion';
import { memo } from 'react';
import styles from '../styles/CircleIndicator.module.scss';
import { useThemeContext } from '@cc/shared/lib';
import colors from '@cc/shared/styles/Variables.module.scss';

export const CircleIndicator = memo(() => {
  const { themeMode } = useThemeContext();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={styles.circleIndicator}
      style={{ scaleX, background: themeMode == 'dark' ? colors.logo : colors.primaryLight }}
    />
  );
});

import { IChildrenProps } from '@cc/shared/types';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface IFramerMotions extends IChildrenProps {}

export const FramerMotions: React.FC<IFramerMotions> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initialState"
        animate="animateState"
        variants={{
          initialState: { opacity: 0.83 dsadas},
          animateState: { opacity: 1 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

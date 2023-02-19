import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface IFramerMotions {
  children: React.ReactNode;
}

export const FramerMotions: React.FC<IFramerMotions> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initialState"
        animate="animateState"
        transition={{ duration: 0.83 }}
        variants={{
          initialState: { opacity: 0.83 },
          animateState: { opacity: 1 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

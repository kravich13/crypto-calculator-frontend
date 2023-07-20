import { Variants } from 'framer-motion';

interface IBaseTansitionParams {
  delay: number;
  duration: number;
  type: string;
}

export const baseTansitionParams: IBaseTansitionParams = {
  delay: 0.2,
  duration: 1.13,
  type: 'spring',
};

export const baseYAnimation: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: (custom?: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom || 1 * 0.2, duration: 1.13, type: 'spring' },
  }),
};

export const imageScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

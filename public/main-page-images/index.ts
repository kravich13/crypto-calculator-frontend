import { StaticImageData } from 'next/image';

type mainStepsData = {
  [key: string]: {
    en: {
      dark: StaticImageData;
      light: StaticImageData;
    };
    ua: {
      dark: StaticImageData;
      light: StaticImageData;
    };
  };
};

export const mainStepsImages: mainStepsData = {
  step1: {
    en: {
      dark: require('./step1/step1-dark-en.png'),
      light: require('./step1/step1-light-en.png'),
    },
    ua: {
      dark: require('./step1/step1-dark-ua.png'),
      light: require('./step1/step1-light-ua.png'),
    },
  },
  step2: {
    en: {
      dark: require('./step2/step2-dark-en.png'),
      light: require('./step2/step2-light-en.png'),
    },
    ua: {
      dark: require('./step2/step2-dark-ua.png'),
      light: require('./step2/step2-light-ua.png'),
    },
  },
  step3: {
    en: {
      dark: require('./step3/step3-dark-en.png'),
      light: require('./step3/step3-light-en.png'),
    },
    ua: {
      dark: require('./step3/step3-dark-ua.png'),
      light: require('./step3/step3-light-ua.png'),
    },
  },
  step4: {
    en: {
      dark: require('./step4/step4-dark-en.png'),
      light: require('./step4/step4-light-en.png'),
    },
    ua: {
      dark: require('./step4/step4-dark-ua.png'),
      light: require('./step4/step4-light-ua.png'),
    },
  },
  step5: {
    en: {
      dark: require('./step5/step5-dark-en.png'),
      light: require('./step5/step5-light-en.png'),
    },
    ua: {
      dark: require('./step5/step5-dark-ua.png'),
      light: require('./step5/step5-light-ua.png'),
    },
  },
};

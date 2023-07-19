import { StaticImageData } from 'next/image';

type mainStepsData = {
  [key: string]: {
    [key: string]: {
      [key: string]: StaticImageData;
    };
  };
};

export const mainStepsImages: mainStepsData = {
  step1: {
    en: {
      dark: require('@public/main-page-images/step1/step1-dark-en.png'),
      light: require('../../../public/main-page-images/step1/step1-light-en.png'),
    },
    ua: {
      dark: require('../../../public/main-page-images/step1/step1-dark-ua.png'),
      light: require('../../../public/main-page-images/step1/step1-light-ua.png'),
    },
  },
  step2: {
    en: {
      dark: require('../../../public/main-page-images/step2/step2-dark-en.png'),
      light: require('../../../public/main-page-images/step2/step2-light-en.png'),
    },
    ua: {
      dark: require('../../../public/main-page-images/step2/step2-dark-ua.png'),
      light: require('../../../public/main-page-images/step2/step2-light-ua.png'),
    },
  },
  step3: {
    en: {
      dark: require('../../../public/main-page-images/step3/step3-dark-en.png'),
      light: require('../../../public/main-page-images/step3/step3-light-en.png'),
    },
    ua: {
      dark: require('../../../public/main-page-images/step3/step3-dark-ua.png'),
      light: require('../../../public/main-page-images/step3/step3-light-ua.png'),
    },
  },
  step4: {
    en: {
      dark: require('../../../public/main-page-images/step4/step4-dark-en.png'),
      light: require('../../../public/main-page-images/step4/step4-light-en.png'),
    },
    ua: {
      dark: require('../../../public/main-page-images/step4/step4-dark-ua.png'),
      light: require('../../../public/main-page-images/step4/step4-light-ua.png'),
    },
  },
  step5: {
    en: {
      dark: require('../../../public/main-page-images/step5/step5-dark-en.png'),
      light: require('../../../public/main-page-images/step5/step5-light-en.png'),
    },
    ua: {
      dark: require('../../../public/main-page-images/step5/step5-dark-ua.png'),
      light: require('../../../public/main-page-images/step5/step5-light-ua.png'),
    },
  },
};

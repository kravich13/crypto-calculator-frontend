import { ThemeModeType } from '../types';

export const darkPixel =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN89WfbfwAJEQOdoUhUmgAAAABJRU5ErkJggg==';
export const lightPixel =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUTT3wHwAEDAI7UVYgywAAAABJRU5ErkJggg==';

export const getBlurDataUrl = (theme: ThemeModeType) =>
  `data:image/png;base64, ${theme === 'dark' ? darkPixel : lightPixel}`;
